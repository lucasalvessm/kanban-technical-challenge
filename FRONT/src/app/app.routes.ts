import { Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { authGuard } from './security/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    component: BoardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./security/components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
