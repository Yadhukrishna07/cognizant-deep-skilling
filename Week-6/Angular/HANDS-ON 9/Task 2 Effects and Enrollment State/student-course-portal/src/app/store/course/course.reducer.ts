import { createReducer, on } from '@ngrx/store';
import { Course } from '../../models/course.model';
import { loadCourses, loadCoursesSuccess, loadCoursesFailure } from './course.actions';

export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null
};

export const courseReducer = createReducer(
  initialState,
  on(loadCourses, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    loading: false
  })),
  on(loadCoursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);