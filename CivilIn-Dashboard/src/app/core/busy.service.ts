import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  visibility: BehaviorSubject<boolean>;

  constructor(private spinner: NgxSpinnerService) {
    this.visibility = new BehaviorSubject(false);
   }

  show() {
    console.log("Testing show");
    this.visibility.next(true);
    this.spinner.show();
  }

  hide() {
    console.log("Testing hide");
    this.visibility.next(true);
    this.spinner.hide();
  }
}
