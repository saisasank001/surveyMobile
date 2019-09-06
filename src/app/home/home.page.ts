import { Component } from '@angular/core';
import {DataService} from "../data.service";
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  modules=[];
  color;
  count;
  tenantName;
  name=JSON.parse(localStorage.getItem('location'))['name'];
  logo;
  private myDate: Date;
  time='00:00:00';

  constructor(public data:DataService,
              public alertCtrl:AlertController,
              public router:Router) {
    this.logo=this.data.getLogo();
    if(!this.data.checkLoggedIn()){
      this.router.navigateByUrl('/get-passcode');
    }
    this.modules=this.data.getTenant()['modules'];
    console.log(this.modules)
    this.color=this.data.getThemeColor();
    this.tenantName=this.data.getTenantName();
  }

  ionViewDidEnter(){
    this.count=0;
    setInterval(() => {         //replaced function() by ()=>
      this.myDate = new Date();
      this.time=(this.myDate.getHours()+':'+this.myDate.getMinutes()+':'+this.myDate.getSeconds()); // just testing if it is working
    }, 1000);
  }

  async presentPrompt() {
    let alert = await this.alertCtrl.create({
      message : "Logout Confirmation",
      inputs: [
        {
          name: 'passcode',
          placeholder: 'Enter passcode'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            this.count=0;
          }
        },
        {
          text: 'logout',
          handler: data => {
            if ((data.passcode)) {
              if(this.data.checkPassCode(data.passcode)){
                localStorage.clear();
                this.router.navigateByUrl('/');
              }
            } else {
              // invalid login
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }


    logout() {
        if(this.count>2){
          this.presentPrompt()
        }
        this.count++;
    }
}
