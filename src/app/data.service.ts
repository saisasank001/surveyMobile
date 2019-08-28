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
}
