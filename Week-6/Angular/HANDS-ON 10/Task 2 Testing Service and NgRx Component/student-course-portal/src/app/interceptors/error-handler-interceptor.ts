import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.error('Unauthorized request - redirecting to home');
        router.navigate(['/']);
      }
      if (error.status === 500) {
        console.error('Server error. Please try again later.');
        alert('Server error. Please try again later.');
      }
      return throwError(() => error);
    })
  );
};