import { Component, HostListener, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
// import { Authenticated } from '../../services/auth.service';
import { DecodedToken, User } from '../../interfaces/user';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  title = 'Link-Union'; // Title for the navbar
  sidebarVisible = false; // Flag to control sidebar visibility
  isScreenLargeEnough = window.innerWidth >= 575; // Flag to track screen size
  items!: MegaMenuItem[]; // Array of menu items for mega menu
  items1!: MenuItem[]; // Array of menu items for regular menu
  user: User | undefined; // Current logged-in user
  userName: string = ''; // User's name

  constructor(
    private authService: AuthService
  ) {}

  // Function to update menu items based on screen size
  updateMenuItems(): void {
    if (!this.isScreenLargeEnough) {
      // If screen size is small, show basic menu items
      this.items = [];
      this.items1 = [
        { label: 'Home', routerLink: '/' },
        { label: 'List', routerLink: 'list' },
        { label: 'Contact', routerLink: 'contact' },
        { label: 'About', routerLink: 'about' },
        { label: 'Profile', routerLink: 'profile' },
      ];
    } else {
      // If screen size is large, show mega menu items
      this.items = [
        { label: 'Home', routerLink: '/' },
        { label: 'List', routerLink: 'list' },
        { label: 'Contact', routerLink: 'contact' },
        { label: 'About', routerLink: 'about' },
      ];
      this.items1 = [];
    }
  }

  // Host listener for window resize event
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Update screen size flag and menu items accordingly
    this.isScreenLargeEnough = window.innerWidth >= 575;
    this.updateMenuItems();
  }

  ngOnInit(): void {
    // Initialize component
    this.loadUserData(); // Load user data
    this.updateMenuItems(); // Update menu items based on initial screen size

    this.authService.onUserAction().subscribe(() => {
      // Refresh logic or update visibility
      this.isUser = this.checkLoggedInStatus();
      this.loadUserData(); // Call loadUserData() when user action occurs
    });
  }

  private checkLoggedInStatus(): boolean {
    // Check if user is logged in based on session storage or other logic
    return sessionStorage.getItem('token') !== null;
  }

  token = sessionStorage?.getItem('token');
  decodedToken!: DecodedToken;
  isUser = !!this.token; // Set isUser to true if token exists, false otherwise

  //token data
  userId!: string;
  email!: string;
  fullname!: string;

  // Function to load user data
  loadUserData(): void {
    if (this.token) {
      try {
        // Decode the JWT token
        this.decodedToken = jwtDecode(this.token);
        //Access the values stored in the token
        this.userId = this.decodedToken.userId;
        this.email = this.decodedToken.email;
        this.fullname = this.decodedToken.fullname;
        this.isUser = true;
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    } else {
      // console.error('JWT token not found in session storage');
      this.isUser = false
    }
  }
}
