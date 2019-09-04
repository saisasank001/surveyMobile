import { Component } from '@angular/core';
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  modules=[];
  color;
  tenantName;
  name=JSON.parse(localStorage.getItem('location'))['name'];
  logo;
  private myDate: Date;
  time='00:00:00';
  constructor(public data:DataService,public router:Router) {
    this.logo='https://www.expectmorearizona.org/wp-content/uploads/2016/11/facebook-png-icon-follow-us-facebook-1.png';
    if(!this.data.checkLoggedIn()){
      this.router.navigateByUrl('/get-passcode');
    }
    this.modules=this.data.getTenant()['modules'];
    console.log(this.modules)
    this.color=this.data.getThemeColor();
    this.tenantName=this.data.getTenantName();
  }

  ionViewDidEnter(){
    setInterval(() => {         //replaced function() by ()=>
      this.myDate = new Date();
      this.time=(this.myDate.getHours()+':'+this.myDate.getMinutes()+':'+this.myDate.getSeconds()); // just testing if it is working
    }, 1000);
  }



}
