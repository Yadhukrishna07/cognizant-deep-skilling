import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, FormsModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {

  isLoading = true;
  courses: Course[] = [];
  selectedCourseId: number | string | null = null;
  searchTerm = '';

  constructor(
    private courseService: CourseService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.searchTerm =
      this.route.snapshot.queryParamMap.get('search') || '';

    this.loadCourses();
  }

  loadCourses() {

    this.isLoading = true;

    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
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

    const search = this.searchTerm.toLowerCase();

    return this.courses.filter(course =>
      course.name.toLowerCase().includes(search) ||
      course.code.toLowerCase().includes(search)
    );
  }

  onEnroll(courseId: number | string) {
    console.log('Enrolling in course:', courseId);
    this.selectedCourseId = courseId;
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
        console.log('Course added successfully');
        this.loadCourses();
      },
      error: (error) => {
        console.error('Error adding course:', error);
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
          console.log('Course updated successfully');
          this.loadCourses();
        },
        error: (error) => {
          console.error('Error updating course:', error);
        }
      });
  }

  // DELETE
  deleteCourse(id: number | string) {

    const confirmed =
      confirm('Are you sure you want to delete this course?');

    if (!confirmed) {
      return;
    }

    this.courseService.deleteCourse(id).subscribe({
      next: () => {
        console.log('Course deleted successfully');
        this.loadCourses();
      },
      error: (error) => {
        console.error('Error deleting course:', error);
      }
    });
  }

  trackByCourseId(index: number, course: Course) {
    return course.id;
  }
}