import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactForm, Link, User } from '../interfaces/user';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class userService {

  constructor(private http: HttpClient) { }

  // Base URL for backend API
  BASE_URL: string = environment.BASE_URL

  // Retrieve user token from session storage
  getUserToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // Retrieve user data by user ID
  getUserData(userId: string, page: number, pageSize: number): Observable<any> {
    const url = `${this.BASE_URL}/user/${userId}/links?page=${page}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }

  // Set user data for a given user ID
  setUserData(data: Link, userId: string): Observable<any> {
    const url = `${this.BASE_URL}/user/${userId}/add-link`;
    return this.http.post<any>(url, data);
  }

  // Retrieve a specific link for a user
  getUserLink(userId: string, linkId: string): Observable<any> {
    const url = `${this.BASE_URL}/user/${userId}/links/${linkId}`;
    return this.http.get<any>(url);
  }

  // Retrieve all links for a user
  getAllUserLinks(userId: string): Observable<any> {
    const url = `${this.BASE_URL}/user/${userId}/links`;
    return this.http.get<any[]>(url);
  }

  // Update a link for a user
  editLink(userId: string, linkId: string, updatedData: any): Observable<any> {
    const url = `${this.BASE_URL}/user/${userId}/edit-link/${linkId}`;
    return this.http.put<any>(url, updatedData);
  }

  // Delete a specific link for a user
  deleteLink(userId: string, linkId: string): Observable<any> {
    const url = `${this.BASE_URL}/user/${userId}/delete-link/${linkId}`;
    return this.http.delete<any>(url);
  }
  
  // Delete all links for a user
  deleteAllUserLinks(userId: string): Observable<any> {
    const url = `${this.BASE_URL}/user/${userId}/delete-all-links`;
    return this.http.delete(url);
  }

  // Delete a user
  deleteUser(userId: string): Observable<any> {
    const url = `${this.BASE_URL}/users/${userId}/delete`;
    return this.http.delete<any>(url);
  }

  // Submit a contact form for a user
  submitContactForm(contactForm: ContactForm, userId: string): Observable<any> {
    const url = `${this.BASE_URL}/users/${userId}/contact`;
    return this.http.post(url, contactForm);
  }
}
