import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course';
import { CourseSummaryWidget } from '../../components/course-summary-widget/course-summary-widget';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule, CourseSummaryWidget],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {

  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  coursesCount = 0;

  constructor(private courseService: CourseService) {}

  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }

  ngOnInit() {

    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.coursesCount = courses.length;
        console.log('HomeComponent initialised — courses loaded');
      },
      error: (error) => {
        console.error('Error loading courses:', error);
      }
    });

  }

  ngOnDestroy() {
    console.log('HomeComponent destroyed');
  }
}