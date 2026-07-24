import { Routes } from '@angular/router';

import { Home }
  from './pages/home/home';

import { CourseList }
  from './pages/course-list/course-list';

import { CourseDetail }
  from './pages/course-detail/course-detail';

import { CoursesLayout }
  from './pages/courses-layout/courses-layout';

import { StudentProfile }
  from './pages/student-profile/student-profile';

import { NotFound }
  from './pages/not-found/not-found';

import { authGuard }
  from './guards/auth-guard';

import { unsavedChangesGuard }
  from './guards/unsaved-changes-guard';

export const routes: Routes = [

  {
    path: '',
    component: Home
  },

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
    component: StudentProfile,
    canActivate: [authGuard]
  },

  // Lazy-loaded enrollment feature
  {
    path: 'enroll',
    canActivate: [authGuard],

    loadChildren: () =>
      import(
        './pages/enrollment/enrollment.routes'
      ).then(
        m => m.ENROLLMENT_ROUTES
      )
  },

  // Lazy-loaded standalone component
  // with CanDeactivate protection
  {
    path: 'enroll-reactive',

    loadComponent: () =>
      import(
        './pages/reactive-enrollment-form/reactive-enrollment-form'
      ).then(
        m => m.ReactiveEnrollmentForm
      ),

    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard]
  },

  {
    path: '**',
    component: NotFound
  }

];