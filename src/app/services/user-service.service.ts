import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ContactForm, Link, User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class userService {

  constructor(private http: HttpClient) { }

  getUserData(userId: string): Observable<User> {
    const url = `https://link-union-backend.onrender.com/users/${userId}`;
    return this.http.get<User>(url, {withCredentials: true});
  }

  setUserData(data: Link, userId: string): Observable<any> {
    const url = `https://link-union-backend.onrender.com/user/${userId}/add-link`; // Update URL to match the backend route
    return this.http.post<any>(url, data, {withCredentials: true}).pipe(
      tap(() => {
        console.log('Link added successfully');
      }),
      catchError((error) => {
        console.error('Failed to add link:', error);
        return throwError('Failed to add link');
      })
    );
  }

  getUserLink(userId: string, linkId: string): Observable<any> {
    const url = `https://link-union-backend.onrender.com/user/${userId}/links/${linkId}`;
    return this.http.get<any>(url, {withCredentials: true}).pipe(
      catchError((error) => {
        console.error('Failed to fetch user link:', error);
        return throwError('Failed to fetch user link');
      })
    );
  }

  getAllUserLinks(userId: string): Observable<any> {
    const url = `https://link-union-backend.onrender.com/user/${userId}/links`;
    return this.http.get<any[]>(url, {withCredentials: true}).pipe(
      catchError((error) => {
        console.error('Failed to fetch user links:', error);
        return throwError('Failed to fetch user links');
      })
    );
  }

  editLink(userId: string, linkId: string, updatedData: any): Observable<any> {
    const url = `https://link-union-backend.onrender.com/user/${userId}/edit-link/${linkId}`;
    return this.http.put<any>(url, updatedData, {withCredentials: true}).pipe(
      catchError((error) => {
        console.error('Failed to edit link:', error);
        return throwError('Failed to edit link');
      })
    );
  }

  deleteLink(userId: string, linkId: string): Observable<any> {
    const url = `https://link-union-backend.onrender.com/user/${userId}/delete-link/${linkId}`;
    return this.http.delete<any>(url, {withCredentials: true}).pipe(
      catchError((error) => {
        console.error('Failed to delete link:', error);
        return throwError('Failed to delete link');
      })
    );
  }
  
  deleteAllUserLinks(userId: string): Observable<any> {
    const url = `https://link-union-backend.onrender.com/user/${userId}/delete-all-links`;
    return this.http.delete(url, {withCredentials: true});
  }

  deleteUser(userId: string): Observable<any> {
    const url = `https://link-union-backend.onrender.com/users/${userId}/delete`;
    return this.http.delete<any>(url, {withCredentials: true}).pipe(
      catchError((error) => {
        console.error('Failed to delete user:', error);
        return throwError('Failed to delete user');
      })
    );
  }

  submitContactForm(contactForm: ContactForm, userId: string): Observable<any> {
    const url = `https://link-union-backend.onrender.com/users/${userId}/contact`; // Update the URL accordingly
    return this.http.post(url, contactForm, {withCredentials: true});
  }

}