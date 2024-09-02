import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    router.navigate(['/login']);
  }

  return true;
};
