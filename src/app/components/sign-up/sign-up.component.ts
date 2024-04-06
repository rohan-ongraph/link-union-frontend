import { Component, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private mssgService: MessageService,
    private route: Router,
    private authService: AuthService
  ) {}

// Form group for sign-up form with validators
registerForm = this.fb.group({
  fullname: [
    '',
    [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)],
  ],
  email: ['', [Validators.required, Validators.email]],
  password: ['', Validators.required],
  confirmPassword: ['', Validators.required],
});

// Submit sign-up form
submitForm() {
  const postDetails = { ...this.registerForm.value };
  delete postDetails.confirmPassword;

  // Call registerUser method from AuthService to register the user
  this.auth.registerUser(postDetails as User).subscribe({
    next: () => {
      // Registration successful
      this.mssgService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Registered Successfully',
        life: 2000
      });
      this.route.navigate(['signIn']);
    },
    error: (err) => {
      // Handle registration error
      if (err.status === 400 && err.error.message === 'Email already exists') {
        // User with this email already exists
        this.mssgService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User with this email already exists',
          life: 2000
        });
      } else {
        // Other registration errors
        this.mssgService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong',
          life: 2000
        });
      }
    }
  });
}

// signUpWithGoogle() {
//   this.authService.signUpWithGoogle().subscribe({
//    next: (res) => {
//     console.log('Sign up with Google response:', res);
//    },
//    error: (err) => {
//     console.log('Error: ', err);
//    }
//   }
//   );
// }

}  
