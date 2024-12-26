import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ComplaintsWebComponent } from '../complaints-web/complaints-web.component';

@Component({
  providers: [ComplaintsWebComponent],
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {

  otp!: string;
  verify: any;

  constructor(private router: Router, private ngZone: NgZone, private comp : ComplaintsWebComponent) { }

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  };

  ngOnInit(): void {
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
    console.log(this.verify);
  }

  onOtpChange(otp: string) {
    this.otp = otp;
  }

  handleClick() {
    console.log(this.otp);
    var credential = firebase.auth.PhoneAuthProvider.credential(
      this.verify,
      this.otp
    );

    const data = localStorage.getItem('data');

    console.log(credential);
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((response) => {
        console.log(response);
        console.log("response.user!.uid : "+response.user!.uid);
        this.comp.insertComplaint(data,response.user!.uid);
        localStorage.setItem('user_data', JSON.stringify(response));
        this.ngZone.run(() => {
          this.router.navigate(['dash']);
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  }

}
