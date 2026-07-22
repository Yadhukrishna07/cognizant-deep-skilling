import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-course-summary-widget',
  imports: [CommonModule],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css',
})
export class CourseSummaryWidget implements OnInit {
  totalCourses = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.totalCourses = this.courseService.getCourses().length;
  }
}