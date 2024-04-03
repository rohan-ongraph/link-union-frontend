import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Method to register a new user
  registerUser(userDetails: User): Observable<any> {
    // Initialize the list of data for the user
    userDetails.links = [];
    // Send a POST request to the server to register the user
    return this.http.post(`https://link-union-backend.onrender.com/register`, userDetails);
  }

  loginUser(email: string, password: string): Observable<any> {
    const userDetails = {
      email, 
      password
    }
    // Send a POST request to the server to login the user
    return this.http.post('https://link-union-backend.onrender.com/login', userDetails, { withCredentials: true });
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
