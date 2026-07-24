import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController
} from '@angular/common/http/testing';

import { CourseService } from './course';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Operating Systems', code: 'CS102', credits: 3, gradeStatus: 'failed' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch courses via GET', () => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should filter out courses with 0 credits', () => {
    const coursesWithZero: Course[] = [
      ...mockCourses,
      { id: 3, name: 'Zero Credit Seminar', code: 'CS103', credits: 0, gradeStatus: 'pending' }
    ];

    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses.find(c => c.credits === 0)).toBeUndefined();
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    req.flush(coursesWithZero);
  });

  it('should handle a server error after retries and return a friendly message', () => {
    service.getCourses().subscribe({
      next: () => fail('expected an error, not courses'),
      error: (error) => {
        expect(error.message).toBe('Failed to load courses. Please try again.');
      }
    });

    // retry(2) means: 1 original request + 2 retries = 3 total requests
    for (let i = 0; i < 3; i++) {
      const req = httpMock.expectOne('http://localhost:3000/courses');
      req.flush('Server error', { status: 500, statusText: 'Server Error' });
    }
  });
});