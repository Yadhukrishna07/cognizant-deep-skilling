import { createAction, props } from '@ngrx/store';

export const enrollInCourse = createAction(
  '[Enrollment] Enroll',
  props<{ courseId: number | string }>()
);

export const unenrollFromCourse = createAction(
  '[Enrollment] Unenroll',
  props<{ courseId: number | string }>()
);

export const setEnrolledCourses = createAction(
  '[Enrollment] Set Enrolled Courses',
  props<{ courseIds: (number | string)[] }>()
);