import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {HttpServiceService} from "../http-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-alert-categories',
  templateUrl: './alert-categories.page.html',
  styleUrls: ['./alert-categories.page.scss'],
})
export class AlertCategoriesPage implements OnInit {

  categories;
  color;
  colors=['blue','red','green']
  constructor(private data:DataService,
              public router:Router,
              public httpService:HttpServiceService) { }

  ngOnInit() {
    this.categories=[{
      name:'Category'
    },{
      name:'Category'
    },{
      name:'Category'
    },{
      name:'Category'
    },{
      name:'Category'
    }]
    let index=0;
    this.categories.forEach(item=>{
      if(index==this.colors.length){
        index=0;
      }
      item.color=this.colors[index++];
    })
    this.color=this.data.getThemeColor();

    this.httpService.postApi({'type': 'alert',tenantId:this.data.getTenantId()}, 'categories/getCategoriesCondition').subscribe((res) => {
      console.log(res);
      if(res['success']){
        this.categories = res['data'];
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
