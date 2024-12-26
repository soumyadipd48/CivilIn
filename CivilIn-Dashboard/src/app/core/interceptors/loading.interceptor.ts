import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { BusyService } from '../busy.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busyService: BusyService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.busyService.show();

    return next.handle(req)
             .pipe(tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        this.busyService.hide();
                    }
                }, (error) => {
                    this.busyService.hide();
                }));
  }
}
