import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {Router} from "@angular/router";
import {HttpServiceService} from "../http-service.service";

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage implements OnInit {

  categories;
  logo;
  color;
  colors=['blue','red','green']
  constructor(private data:DataService,
              public router:Router,
              public httpService:HttpServiceService) { }

  ngOnInit() {
    this.logo=this.data.getLogo()
    this.categories=[]
    let index=0;

    this.color=this.data.getThemeColor();

    this.httpService.postApi({'type': 'checklist',tenantId:this.data.getTenantId()}, 'categories/getCategoriesCondition').subscribe((res) => {
      console.log(res);
      if(res['success']){
        this.categories = res['data'];
        this.categories.forEach(item=>{
          if(index==this.colors.length){
            index=0;
          }
          item.color=this.colors[index++];
        })
      }
    });
  }

  getCharIcon(value){
    return value.slice(0,1).toUpperCase()
  }

  selectCategory(category: any) {
    localStorage.setItem('category',JSON.stringify(category));
    this.router.navigateByUrl('/alert-dashboard');
  }

}
