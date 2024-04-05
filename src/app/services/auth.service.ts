import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  BASE_URL: string = "https://link-union-backend.onrender.com"

  // Method to register a new user
  registerUser(userDetails: User): Observable<any> {
    // Initialize the list of data for the user
    userDetails.links = [];
    // Send a POST request to the server to register the user
    return this.http.post(`${this.BASE_URL}/register`, userDetails);
  }

  loginUser(email: string, password: string): Observable<any> {
    const userDetails = {
      email, 
      password
    }
    // Send a POST request to the server to login the user
    return this.http.post(`${this.BASE_URL}/login`, userDetails);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  signUpWithGoogle():Observable<any>{
    return this.http.get(`${this.BASE_URL}/auth/google`)
  }

  private userActionSubject = new Subject<void>();

  // Method to notify subscribers about user actions
  notifyUserAction(): void {
    this.userActionSubject.next();
  }

  // Method to subscribe to user actions
  onUserAction(): Observable<void> {
    return this.userActionSubject.asObservable();
  }
}
