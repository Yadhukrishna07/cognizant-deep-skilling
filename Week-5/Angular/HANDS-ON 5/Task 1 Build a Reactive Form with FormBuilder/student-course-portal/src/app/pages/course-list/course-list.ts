import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  isLoading = true;

  courses = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Operating Systems', code: 'CS102', credits: 3, gradeStatus: 'failed' },
    { id: 3, name: 'Database Management', code: 'CS103', credits: 4, gradeStatus: 'pending' },
    { id: 4, name: 'Computer Networks', code: 'CS104', credits: 3, gradeStatus: 'passed' },
    { id: 5, name: 'Web Development', code: 'CS105', credits: 2, gradeStatus: 'pending' },
  ];

  selectedCourseId: number | null = null;

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  onEnroll(courseId: number) {
    console.log('Enrolling in course:', courseId);
    this.selectedCourseId = courseId;
  }

  // Step 26: trackBy function — improves performance by letting Angular
  // identify each item by its unique id instead of re-rendering the
  // entire list when the array reference changes.
  trackByCourseId(index: number, course: any) {
    return course.id;
  }
}