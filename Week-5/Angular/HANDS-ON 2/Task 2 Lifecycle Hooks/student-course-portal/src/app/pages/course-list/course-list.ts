import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList {
  courses = [
    { id: 1, name: 'Data Structures', code: 'CS101' },
    { id: 2, name: 'Operating Systems', code: 'CS102' },
    { id: 3, name: 'Database Management', code: 'CS103' },
  ];
}