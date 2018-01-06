import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController , public angularFireAuth : AngularFireAuth) {
    if(!this.isLoggedIn()){
      console.log("you are not authorized");
      this.navCtrl.push(LoginPage);
    }
  }

  isLoggedIn(){
    if(window.localStorage.getItem('currentuser')){
      return true;
    }
  }

  logout() {
    
    window.localStorage.removeItem('currentuser'); 
    this.angularFireAuth.auth.signOut();
    this.navCtrl.push(LoginPage);
  }

}
