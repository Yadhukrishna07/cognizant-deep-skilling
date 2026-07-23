import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CourseService } from '../../services/course';
import {
  EnrollmentService,
  Student
} from '../../services/enrollment';

import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {

  isLoading = true;

  courses: Course[] = [];

  selectedCourseId: number | string | null = null;

  selectedStudents: Student[] = [];

  searchTerm = '';

  errorMessage = '';

  private courseSelection$ =
    new Subject<number | string>();

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.searchTerm =
      this.route.snapshot.queryParamMap.get('search') || '';

    this.loadCourses();

    // Task 2 - switchMap
    // If another course is selected before the previous
    // request completes, switchMap cancels the old request.
    this.courseSelection$
      .pipe(
        switchMap(courseId =>
          this.enrollmentService.getStudentsByCourse(courseId)
        )
      )
      .subscribe({
        next: students => {
          this.selectedStudents = students;
        },

        error: error => {
          console.error(
            'Error loading enrolled students:',
            error
          );
        }
      });
  }

  loadCourses() {

    this.isLoading = true;
    this.errorMessage = '';

    this.courseService.getCourses().subscribe({

      next: courses => {
        this.courses = courses;
        this.isLoading = false;
      },

      error: error => {
        this.errorMessage =
          error.message ||
          'Failed to load courses. Please try again.';

        this.isLoading = false;
      }

    });
  }

  onSearch() {

    this.router.navigate(['/courses'], {
      queryParams: {
        search: this.searchTerm || null
      }
    });
  }

  get filteredCourses() {

    if (!this.searchTerm.trim()) {
      return this.courses;
    }

    const search =
      this.searchTerm.toLowerCase();

    return this.courses.filter(course =>
      course.name.toLowerCase().includes(search) ||
      course.code.toLowerCase().includes(search)
    );
  }

  onEnroll(courseId: number | string) {

    console.log(
      'Selected course:',
      courseId
    );

    this.selectedCourseId = courseId;

    // Trigger switchMap request
    this.courseSelection$.next(courseId);
  }

  // POST
  addNewCourse() {

    const newCourse: Course = {
      id: 0,
      name: 'New Test Course',
      code: 'CS106',
      credits: 3,
      gradeStatus: 'pending'
    };

    this.courseService.addCourse(newCourse).subscribe({

      next: () => {
        console.log(
          'Course added successfully'
        );

        this.loadCourses();
      },

      error: error => {
        console.error(
          'Error adding course:',
          error
        );
      }

    });
  }

  // PUT
  updateCourse(course: Course) {

    const updatedCourse: Course = {
      ...course,
      name: course.name + ' - Updated'
    };

    this.courseService
      .updateCourse(course.id, updatedCourse)
      .subscribe({

        next: () => {
          console.log(
            'Course updated successfully'
          );

          this.loadCourses();
        },

        error: error => {
          console.error(
            'Error updating course:',
            error
          );
        }

      });
  }

  // DELETE
  deleteCourse(id: number | string) {

    const confirmed =
      confirm(
        'Are you sure you want to delete this course?'
      );

    if (!confirmed) {
      return;
    }

    this.courseService
      .deleteCourse(id)
      .subscribe({

        next: () => {
          console.log(
            'Course deleted successfully'
          );

          this.loadCourses();
        },

        error: error => {
          console.error(
            'Error deleting course:',
            error
          );
        }

      });
  }

  trackByCourseId(
    index: number,
    course: Course
  ) {
    return course.id;
  }
}