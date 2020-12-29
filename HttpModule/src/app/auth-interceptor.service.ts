import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    console.log('request is on the way!');
    const modifiedReq = req.clone({headers: req.headers.append('AuthKey', 'xyz')});
    return next.handle(modifiedReq).pipe(tap( event => {
      if (event.type === HttpEventType.Response) {
        console.log('RESPONSE!');
      }
    }));
  }
}
