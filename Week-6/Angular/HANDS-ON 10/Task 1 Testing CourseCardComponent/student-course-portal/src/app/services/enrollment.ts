import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  forkJoin,
  of
} from 'rxjs';

import {
  map,
  switchMap
} from 'rxjs/operators';

import { Course } from '../models/course.model';
import { CourseService } from './course';

export interface Student {
  id: number | string;
  name: string;
  email?: string;
}

export interface Enrollment {
  id: number | string;
  studentId: number | string;
  courseId: number | string;
}

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private enrolledCourseIds: (number | string)[] = [];

  private studentsUrl =
    'http://localhost:3000/students';

  private enrollmentsUrl =
    'http://localhost:3000/enrollments';

  constructor(
    private courseService: CourseService,
    private http: HttpClient
  ) {}

  enroll(courseId: number | string): void {
    if (!this.enrolledCourseIds.includes(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number | string): void {
    this.enrolledCourseIds =
      this.enrolledCourseIds.filter(
        id => id !== courseId
      );
  }

  isEnrolled(courseId: number | string): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): Observable<Course[]> {

    if (this.enrolledCourseIds.length === 0) {
      return of([]);
    }

    return forkJoin(
      this.enrolledCourseIds.map(
        id => this.courseService.getCourseById(id)
      )
    );
  }

  // Task 2 - switchMap
  getStudentsByCourse(
    courseId: number | string
  ): Observable<Student[]> {

    return this.http
      .get<Enrollment[]>(
        `${this.enrollmentsUrl}?courseId=${courseId}`
      )
      .pipe(

        map(enrollments =>
          enrollments.map(
            enrollment => enrollment.studentId
          )
        ),

        switchMap(studentIds => {

          if (studentIds.length === 0) {
            return of([]);
          }

          return this.http
            .get<Student[]>(this.studentsUrl)
            .pipe(
              map(students =>
                students.filter(student =>
                  studentIds.includes(student.id)
                )
              )
            );
        })

      );
  }
}