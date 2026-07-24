import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CourseService } from '../../services/course';
import {
  loadCourses,
  loadCoursesSuccess,
  loadCoursesFailure
} from './course.actions';

@Injectable()
export class CourseEffects {
  private actions$ = inject(Actions);
  private courseService = inject(CourseService);

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCourses),
      switchMap(() =>
        this.courseService.getCourses().pipe(
          map(courses => loadCoursesSuccess({ courses })),
          catchError(error =>
            of(loadCoursesFailure({ error: error.message || 'Failed to load courses.' }))
          )
        )
      )
    )
  );
}