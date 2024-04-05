import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ContactForm, Link, User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class userService {

  constructor(private http: HttpClient) { }

  BASE_URL: string = "https://link-union-backend.onrender.com"

  getUserToken(): string | null {
    return sessionStorage.getItem('token');
  }

  getUserData(userId: string): Observable<User> {
    const url = `${this.BASE_URL}/users/${userId}`;
    return this.http.get<User>(url);
  }

  setUserData(data: Link, userId: string): Observable<any> {
    const url = `${this.BASE_URL}/user/${userId}/add-link`; // Update URL to match the backend route
    return this.http.post<any>(url, data);
  }

  getUserLink(userId: string, linkId: string): Observable<any> {
    const url = `${this.BASE_URL}/user/${userId}/links/${linkId}`;
    return this.http.get<any>(url);
  }

  getAllUserLinks(userId: string): Observable<any> {
    const url = `${this.BASE_URL}/user/${userId}/links`;
    return this.http.get<any[]>(url);
  }

  editLink(userId: string, linkId: string, updatedData: any): Observable<any> {
    const url = `${this.BASE_URL}/user/${userId}/edit-link/${linkId}`;
    return this.http.put<any>(url, updatedData);
  }

  deleteLink(userId: string, linkId: string): Observable<any> {
    const url = `${this.BASE_URL}/user/${userId}/delete-link/${linkId}`;
    return this.http.delete<any>(url);
  }
  
  deleteAllUserLinks(userId: string): Observable<any> {
    const url = `${this.BASE_URL}/user/${userId}/delete-all-links`;
    return this.http.delete(url);
  }

  deleteUser(userId: string): Observable<any> {
    const url = `${this.BASE_URL}/users/${userId}/delete`;
    return this.http.delete<any>(url);
  }

  submitContactForm(contactForm: ContactForm, userId: string): Observable<any> {
    const url = `${this.BASE_URL}/users/${userId}/contact`; // Update the URL accordingly
    return this.http.post(url, contactForm);
  }

}