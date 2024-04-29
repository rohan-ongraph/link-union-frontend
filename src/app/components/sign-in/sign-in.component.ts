import { Component, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private mssgService: MessageService,
    private route: Router,
    private ngZone: NgZone,
    private authService: AuthService
  ) {
    this.isUser = !!sessionStorage.getItem("token")
  }

  isUser:boolean 
  // Form group for sign-in form
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  loginUser() {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.auth.loginUser(email, password).subscribe({
        next: (res) => {
          // this.ngZone.run(() => {
            sessionStorage.setItem('token', res.token); // Store token in session storage
            this.auth.notifyUserAction(true);

          // Redirect to list page upon successful login
          this.route.navigate(['list']);
          this.showSuccessMessage('Successfully Logged in');
          // });
        },
        error: () => {
          this.showErrorMessage('Something went wrong');
          // Handle error response, e.g., show error message to user
        },
      });
    }
  }

  // Method to show success message
  private showSuccessMessage(message: string) {
    this.ngZone.run(() => {
      this.mssgService.add({
        severity: 'success',
        summary: 'Success',
        detail: message,
        life: 2000, // Time duration to display message
      });
    });
  }

  // Method to show error message
  private showErrorMessage(message: string) {
    this.ngZone.run(() => {
      //message alert
      this.mssgService.add({
        severity: 'error',
        summary: 'Error',
        detail: message,
        life: 2000, // Time duration to display message
      });
    });
  }
  signInWithGoogle(){
    this.authService.triggerGoogleAuth().subscribe({
      next: (response) => {
        // window.location.href = response.url;
        this.route.navigate(['signUp'])
      },
      error: () => console.log("ERROR IN GOOGLE SIGN UP")
    });
  }
}
