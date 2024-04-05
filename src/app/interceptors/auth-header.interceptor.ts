import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { userService } from '../services/user-service.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: userService) {}

  // Intercept method to modify outgoing HTTP requests
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Retrieve user token from user service
    const token = this.userService.getUserToken();

    // If token is available, add it to the request headers
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    // Forward the modified request to the next interceptor or handler
    return next.handle(req);
  }
}
