import { Injectable } from '@angular/core';
import {MenuController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public menu: MenuController) {

  }
  toggleMenu=()=>{
    alert(this.menu.isOpen())
    if(this.menu.isEnabled()){
      this.menu.enable(false);
      this.menu.close()
    }else{
      this.menu.enable(true);
      this.menu.open()
    }
  }

  getTenantCode(){
    return localStorage.getItem('tenantCode')===null?false:localStorage.getItem('tenantCode');
  }

  getTenant(){
    return localStorage.getItem('tenant')===null?false:JSON.parse(localStorage.getItem('tenant'));
  }

  getLocation(){
    return localStorage.getItem('location')===null?false:JSON.parse(localStorage.getItem('location'));
  }

  getTenantId(){
    return localStorage.getItem('location')===null?false:JSON.parse(localStorage.getItem('tenant'))['_id'];
  }

  getLogo(){
    return 'https://www.underconsideration.com/brandnew/archives/cyient_logo_detail.png';
  }

  getTenantName(){
    return localStorage.getItem('location')===null?false:JSON.parse(localStorage.getItem('tenant'))['tenantName']
  }

  storeTenantCode(value){
    localStorage.setItem('tenantCode',value);
  }

  storeTenant(value){
    localStorage.setItem('tenant',JSON.stringify(value));
  }

  storeLocation(value){
    localStorage.setItem('location',JSON.stringify(value));
  }

  checkLoggedIn(){
    return localStorage.getItem('loggedIn')===null?false:localStorage.getItem('loggedIn');
  }

  getThemeColor(){
    return this.getTenant()['theme'];
  }
}
