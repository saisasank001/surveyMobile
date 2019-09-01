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
  constructor(public data:DataService,public router:Router) {
    if(!this.data.checkLoggedIn()){
      this.router.navigateByUrl('/get-passcode');
    }
    this.modules=this.data.getTenant()['modules'];
    console.log(this.modules)
    this.color=this.data.getThemeColor();
  }

}
