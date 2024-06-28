import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userData: any;
  complaint_id: any;

  constructor(private afAuth: AngularFireAuth, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
    var data = JSON.parse(localStorage.getItem('user_data') || '{}');
    this.complaint_id = JSON.parse(localStorage.getItem('complaint_uniqueId') || '{}');
    this.userData = data.user.uid;
    console.log(this.userData);
    console.log(this.complaint_id);
    this.logout();
  }

  logout() {
    localStorage.removeItem('verificationId');
    localStorage.removeItem('data');
    localStorage.removeItem('user_data');
    return this.afAuth.signOut();
  }

  RaiseNewComplaint() {
    this.router.navigate(['complaints_web']);
  }
}
