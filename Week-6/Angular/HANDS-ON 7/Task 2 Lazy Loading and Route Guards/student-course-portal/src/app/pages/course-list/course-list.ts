import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, FormsModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {

  isLoading = true;
  courses: any[] = [];
  selectedCourseId: number | null = null;

  searchTerm = '';

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.courses = this.courseService.getCourses();

    // Read the search value from /courses?search=...
    this.searchTerm =
      this.route.snapshot.queryParamMap.get('search') || '';

    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
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

  onEnroll(courseId: number) {
    console.log('Enrolling in course:', courseId);
    this.selectedCourseId = courseId;
  }

  addNewCourse() {
    this.courseService.addCourse({
      id: 6,
      name: 'New Test Course',
      code: 'CS106',
      credits: 3,
      gradeStatus: 'pending'
    });

    this.courses = this.courseService.getCourses();
  }

  trackByCourseId(index: number, course: any) {
    return course.id;
  }
}