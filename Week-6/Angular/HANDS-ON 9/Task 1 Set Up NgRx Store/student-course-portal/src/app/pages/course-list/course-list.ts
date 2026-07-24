import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { CourseService } from '../../services/course';
import {
  EnrollmentService,
  Student
} from '../../services/enrollment';

import { Course } from '../../models/course.model';
import { loadCourses } from '../../store/course/course.actions';
import {
  selectAllCourses,
  selectCoursesLoading,
  selectCoursesError
} from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit, OnDestroy {

  isLoading = true;

  courses: Course[] = [];

  selectedCourseId: number | string | null = null;

  selectedStudents: Student[] = [];

  searchTerm = '';

  errorMessage = '';

  private courseSelection$ =
    new Subject<number | string>();

  private subscriptions = new Subscription();

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private store: Store,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.searchTerm =
      this.route.snapshot.queryParamMap.get('search') || '';

    // Task 1 - NgRx: subscribe to store slices instead of calling
    // the service directly. Assigning to local properties keeps
    // filteredCourses / searchTerm logic below working unchanged.
    this.subscriptions.add(
      this.store.select(selectAllCourses).subscribe(courses => {
        this.courses = courses;
      })
    );

    this.subscriptions.add(
      this.store.select(selectCoursesLoading).subscribe(loading => {
        this.isLoading = loading;
      })
    );

    this.subscriptions.add(
      this.store.select(selectCoursesError).subscribe(error => {
        this.errorMessage = error || '';
      })
    );

    // Dispatch the load action - the Effect (Task 2) will call
    // CourseService and dispatch loadCoursesSuccess/Failure.
    this.store.dispatch(loadCourses());

    // Task 2 - switchMap
    // If another course is selected before the previous
    // request completes, switchMap cancels the old request.
    this.subscriptions.add(
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
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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

        this.store.dispatch(loadCourses());
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

          this.store.dispatch(loadCourses());
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

          this.store.dispatch(loadCourses());
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