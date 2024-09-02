import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem('accessToken');
  const router = inject(Router);

  if (!accessToken) {
    handleUnauthorizedRequest(router);
    return next(req);
  } else {
    const newReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    });
    return next(newReq).pipe(
      catchError((response) => {
        if (response.status === 401) {
          handleUnauthorizedRequest(router);
        }
        return of(response);
      })
    );
  }
};

const handleUnauthorizedRequest = (router: Router) => {
  localStorage.removeItem('accessToken');
  router.navigate(['/login']);
};
