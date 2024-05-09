import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Common URL termed as base url
  BASE_URL: string = environment.BASE_URL

  // Method to register a new user
  registerUser(userDetails: User): Observable<any> {
    // Send a POST request to the server to register the user
    return this.http.post(`${this.BASE_URL}/register`, userDetails);
  }

  // Method to login a user
  loginUser(email: string, password: string): Observable<any> {
    const userDetails = {
      email, 
      password
    }
    // Send a POST request to the server to login the user
    return this.http.post(`${this.BASE_URL}/login`, userDetails);
  }

  // Method to trigger Google OAuth authentication
  triggerGoogleAuth(): Observable<any> {
    console.log("HITTING GOOGLE API")
    return this.http.get<any>(`${this.BASE_URL}/auth/google`);
  }

  private userActionSubject = new Subject<boolean>();

  // Method to notify subscribers about user actions
  notifyUserAction(isAuthenticated: boolean): void {
    this.userActionSubject.next(isAuthenticated);
  }

  // Method to subscribe to user actions
  onUserAction(): Observable<boolean> {
    return this.userActionSubject.asObservable();
  }
}
