import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../shared/material/material.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  hidePassword = signal(true);
  errorOnLogin = signal(false);
  disableSubmit = signal(false);

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.disableSubmit.set(true);
    this.authService.login(this.username, this.password).subscribe((result) => {
      this.errorOnLogin.set(!result);
      this.disableSubmit.set(false);
      this.router.navigate(['/home']);
    });
  }

  autoLogin(): void {
    this.username = 'letscode';
    this.password = 'lets@123';
    this.onSubmit();
  }

  clickEvent(event: MouseEvent): void {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }
}
