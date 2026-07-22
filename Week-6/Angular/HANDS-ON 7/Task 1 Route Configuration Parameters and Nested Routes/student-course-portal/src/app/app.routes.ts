import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { CourseList } from './pages/course-list/course-list';
import { CourseDetail } from './pages/course-detail/course-detail';
import { CoursesLayout } from './pages/courses-layout/courses-layout';
import { StudentProfile } from './pages/student-profile/student-profile';
import { EnrollmentForm } from './pages/enrollment-form/enrollment-form';
import { ReactiveEnrollmentForm } from './pages/reactive-enrollment-form/reactive-enrollment-form';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  // Nested Courses Routes
  {
    path: 'courses',
    component: CoursesLayout,
    children: [
      {
        path: '',
        component: CourseList
      },
      {
        path: ':id',
        component: CourseDetail
      }
    ]
  },

  {
    path: 'profile',
    component: StudentProfile
  },

  {
    path: 'enroll',
    component: EnrollmentForm
  },

  {
    path: 'enroll-reactive',
    component: ReactiveEnrollmentForm
  },

  // Wildcard route must always be last
  {
    path: '**',
    component: NotFound
  }

];