import { registerLocaleData } from '@angular/common';
import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import * as auth from 'firebase/auth';
import { Router } from '@angular/router';
import { User } from '../models/user';
//import { User } from '../shared/services/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Save logged in user data
  userData: any;
  

  constructor(private afAuth : AngularFireAuth, private router : Router, private afs : AngularFirestore, public ngZone : NgZone) {

    var CryptoJS = require("crypto-js");

    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if(user)
      {
        this.userData=user;
        let string = JSON.stringify(this.userData);
        const secret = "xkMBON33!78kn@";
        let encrypted = CryptoJS.AES.encrypt(string,secret).toString();
        sessionStorage.setItem('user', encrypted);
        // sessionStorage.setItem('user', JSON.stringify(this.userData));
        //JSON.parse(sessionStorage.getItem('user')!);
      } else {
        sessionStorage.setItem('user', 'null');
        //JSON.parse(sessionStorage.getItem('user')!);
      }
    });
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['complaints']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
    // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  // SendVerificationMail() {
  //   return this.afAuth.currentUser
  //     .then((user) => {
  //       return user?.sendEmailVerification();
  //     })
  //     .then(() => {
  //       this.router.navigate(['verify-email-address']);
  //     });
  // }

  async SendVerificationMail(){
    (await this.afAuth.currentUser)?.sendEmailVerification().then(() => {
      console.log("email sent");
    })
    .then(() => {
      this.router.navigate(['verify-email-address']);
    });
  }

  //old get logged in

  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(sessionStorage.getItem('user')!);
  //   return (user !== null && user.emailVerified !== false) ? true : false;
  // }

  //new get logged in
    get isLoggedIn(): boolean {
      var CryptoJS = require("crypto-js");
      const secret = "xkMBON33!78kn@";
      let UserStr = sessionStorage.getItem('user')!;
      const decTempUser = CryptoJS.AES.decrypt(UserStr, secret);
      const user = JSON.parse(decTempUser.toString(CryptoJS.enc.Utf8));
      return (user !== null && user.emailVerified !== false) ? true : false;
    }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['base']);
    });
  }

   // Auth logic to run auth providers
   AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['base']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

    // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      // localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
