import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-checklist-passcode',
  templateUrl: './checklist-passcode.page.html',
  styleUrls: ['./checklist-passcode.page.scss'],
})
export class ChecklistPasscodePage implements OnInit {

  primaryColor;
  v=['','','',''];
  index=0;
  constructor(public dataService:DataService) { }

  ngOnInit() {
    this.primaryColor=this.dataService.getThemeColor();
  }

  moveFocus(event, nextElement, previousElement) {
    if (event.keyCode == 8 && previousElement) {
      previousElement.setFocus();
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else {
      event.path[0].value = '';
    }
  }

  insertValue(value){
    if(value!=-1 && this.index<4){
      this.v[this.index++]=value;
    }else if(value==-1){
      this.v[--this.index]='';
    }
  }

}
