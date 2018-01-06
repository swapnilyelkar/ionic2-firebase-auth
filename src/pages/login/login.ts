import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
// Do not import from 'firebase' as you'd lose the tree s

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: any;
  password: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public angularFireAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.angularFireAuth.auth.signInWithEmailAndPassword(this.email, this.password).then((response => {
      console.log('Login success' + JSON.stringify(response));
      let currentuser = {
        email: response.email,
        picture: response.photoURL
      };
      window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
      this.navCtrl.pop();
    })).catch((error) => {
      console.log(error);
    });
  }


  googleLogin() {
    this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((response => {
      console.log('Login success' + JSON.stringify(response));
      let currentuser = {
        email: response.user.email,
        picture: response.user.photoURL
      };
      window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
      this.navCtrl.pop();
    })).catch((error) => {
      console.log(error);
    });
  }

 facebookLogin() {
    this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((response => {
      console.log('Login success' + JSON.stringify(response));
      let token = response.credential.accessToken;
      let currentuser = {
        email: response.user.email,
        picture: response.user.photoURL
      };
      window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
      window.localStorage.setItem('token', JSON.stringify(token));
      this.navCtrl.pop();
    })).catch((error) => {
      console.log(JSON.stringify(error));
    });;
  }


}
