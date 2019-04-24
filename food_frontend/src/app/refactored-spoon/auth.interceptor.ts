import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let idToken = localStorage.getItem('id_token');

        //don't want to add auth header to usda api requests
        if (idToken && req.url.startsWith('http://localhost')) {
            const cloned = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${idToken}`
                }
            });

            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}
