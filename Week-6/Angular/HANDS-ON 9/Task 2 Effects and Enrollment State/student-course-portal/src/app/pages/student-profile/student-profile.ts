import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment';
import { Course } from '../../models/course.model';
import { Notification } from '../../components/notification/notification';

@Component({
  selector: 'app-student-profile',
  imports: [CommonModule, Notification],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile implements OnInit {

  enrolledCourses: Course[] = [];

  constructor(
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit() {
    this.enrollmentService.getEnrolledCourses().subscribe({
      next: (courses) => {
        this.enrolledCourses = courses;
      },
      error: (error) => {
        console.error('Error loading enrolled courses:', error);
      }
    });
  }
}