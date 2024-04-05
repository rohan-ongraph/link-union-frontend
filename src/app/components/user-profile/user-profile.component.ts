import { Component, OnInit } from '@angular/core';
import { userService } from '../../services/user-service.service';
import { DecodedToken, User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  constructor(
    private userService: userService,
    private router: Router,
    private authService: AuthService
  ) {}

  // Properties
  user!: User;
  username!: string;
  email!: string;
  userId!: string;
  userPic!: any;
  decodedToken!: DecodedToken;

  ngOnInit(): void {
    // Load user data on component initialization
    this.loadUserData();
  }

  // Method to load user data
  loadUserData(): void {
    // Retrieve user data from session storage
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        // Decode the JWT token
        this.decodedToken = jwtDecode(token);
        //Access the values stored in the token
        this.userId = this.decodedToken.userId;
        this.email = this.decodedToken.email;
        this.username = this.decodedToken.fullname;
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    } else {
      console.error('JWT token not found in session storage');
    }

  }

  logout(): void {
    sessionStorage.clear();
    // Notify subscribers about user action
    this.authService.notifyUserAction();
    // Navigate to sign-in page
    this.router.navigate(['signIn']);
  }

  // Method to delete user account
  deleteUser(): void {
    // Check if userId is available
    if (this.userId) {
      // Call deleteUser method from user service
      this.userService.deleteUser(this.userId).subscribe({
        next: () => {
          // Clear session storage
          sessionStorage.clear();
          // Notify subscribers about user action
          this.authService.notifyUserAction();
          // Navigate to sign-in page
          this.router.navigate(['signIn']);
        }
      });
    }
  }
}
