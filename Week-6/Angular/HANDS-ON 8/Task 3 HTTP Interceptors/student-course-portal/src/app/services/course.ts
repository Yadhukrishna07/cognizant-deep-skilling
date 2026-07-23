import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  throwError
} from 'rxjs';

import {
  map,
  tap,
  retry,
  catchError
} from 'rxjs/operators';

import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  // GET all courses
  // Task 2: map + tap + retry + catchError
  getCourses(): Observable<Course[]> {

    return this.http.get<Course[]>(this.apiUrl).pipe(

      // Retry failed HTTP request 2 times
      retry(2),

      // Transform response:
      // only courses with credits greater than 0
      map(courses =>
        courses.filter(course => course.credits > 0)
      ),

      // tap is used for side effects such as logging.
      // It does not modify the data like map does.
      tap(courses =>
        console.log('Courses loaded:', courses.length)
      ),

      // Handle HTTP errors
      catchError(error => {

        console.error('Error loading courses:', error);

        return throwError(
          () =>
            new Error(
              'Failed to load courses. Please try again.'
            )
        );

      })

    );
  }

  // GET course by ID
  getCourseById(
    id: number | string
  ): Observable<Course> {

    return this.http.get<Course>(
      `${this.apiUrl}/${id}`
    );
  }

  // POST
  addCourse(
    course: Course
  ): Observable<Course> {

    return this.http.post<Course>(
      this.apiUrl,
      course
    );
  }

  // PUT
  updateCourse(
    id: number | string,
    course: Course
  ): Observable<Course> {

    return this.http.put<Course>(
      `${this.apiUrl}/${id}`,
      course
    );
  }

  // DELETE
  deleteCourse(
    id: number | string
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}