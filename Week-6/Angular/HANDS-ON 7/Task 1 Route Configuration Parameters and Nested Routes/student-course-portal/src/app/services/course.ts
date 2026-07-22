import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Operating Systems', code: 'CS102', credits: 3, gradeStatus: 'failed' },
    { id: 3, name: 'Database Management', code: 'CS103', credits: 4, gradeStatus: 'pending' },
    { id: 4, name: 'Computer Networks', code: 'CS104', credits: 3, gradeStatus: 'passed' },
    { id: 5, name: 'Web Development', code: 'CS105', credits: 2, gradeStatus: 'pending' },
  ];

  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find(c => c.id === id);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }
}