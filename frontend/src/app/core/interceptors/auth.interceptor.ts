import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

// Intercepts every outgoing HTTP request and attaches the JWT token
// to the Authorization header if the user is logged in.
// This means we never have to manually add the header in any service.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    // HTTP requests are immutable, so we clone with the new header instead of mutating
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned);
  }

  return next(req);
};
