import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {HttpServiceService} from "../http-service.service";
import {Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-alert-categories',
  templateUrl: './alert-categories.page.html',
  styleUrls: ['./alert-categories.page.scss'],
})
export class AlertCategoriesPage implements OnInit {

  categories;
  logo;
  loading;
  color;
  tenantName;
  colors=['blue','red','green']
  constructor(private data:DataService,
              public router:Router,
              public loadingCtrl:LoadingController,
              public httpService:HttpServiceService) { }

  async ngOnInit() {
      this.tenantName=this.data.getTenantName();
    this.logo=this.data.getLogo()
    this.categories=[]
    let index=0;

    this.color=this.data.getThemeColor();

    this.loading = await this.loadingCtrl.create({
      message: 'Loading'
    });

    this.loading.present();

    this.httpService.postApi({'type': 'alert',tenantId:this.data.getTenantId()}, 'categories/getCategoriesCondition').subscribe((res) => {
      console.log(res);
      if(res['success']){
        this.categories = res['data'];
        this.categories.forEach(item=>{
          if(index==this.colors.length){
            index=0;
          }
          item.color=this.colors[index++];
        });
        this.loading.dismiss();
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
