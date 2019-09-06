import { Component, OnInit } from '@angular/core';
import {AlertController, MenuController} from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {DataService} from "../data.service";
import {Router} from "@angular/router";
import {HttpServiceService} from "../http-service.service";

@Component({
  selector: 'app-get-passcode',
  templateUrl: './get-passcode.page.html',
  styleUrls: ['./get-passcode.page.scss'],
})
export class GetPasscodePage implements OnInit {

  passCode;
    loginPage: FormGroup;
  constructor(public menu:MenuController,
              public data:DataService,
              public alertController:AlertController,
              public router:Router,
              private formBuilder: FormBuilder,
              public http:HttpServiceService
  ) {
    this.menu.enable(false);
    if(this.data.checkLoggedIn()){
      this.router.navigateByUrl('/home')
    }
  }

  ngOnInit() {
      this.loginPage = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(3)]]
      });
  }

  async showAlert(message){
    const alert =  await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
    return;
  }

  storeParsed(key,value){
    localStorage.setItem(key,JSON.stringify(value));
  }



   submit=(value)=>{

    this.http.postApi({tenantCode:value.username,passCode:value.password},'auth/device/login').subscribe(res=>{
      console.log({res});
      if(res.success){
        this.data.storeTenant(res.data.tenant);
        this.data.storeTenantCode(res.data.tenant["tenantCode"]);
        this.data.storeLocation(res.data.location);
        this.data.storeDevice(res.data.device)
        localStorage.setItem('loggedIn','true');
        this.router.navigateByUrl('/home')
      }else{
        this.showAlert(res.message);
      }
    },err=>{
      this.showAlert('Something went wrong, please try again with proper connection');
    })
  }

}
