import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {Router} from "@angular/router";
import {HttpServiceService} from "../http-service.service";
import {FirebaseDbService} from "../firebase-db.service";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-alert-dashboard',
  templateUrl: './alert-dashboard.page.html',
  styleUrls: ['./alert-dashboard.page.scss'],
})
export class AlertDashboardPage implements OnInit {



  categories;
  color;
  logo;
  primaryColor;
  icons=[];
  alerts=[];
  allAlerts=[];
  loading;
  colors=['blue','red','green']
  constructor(private data:DataService,
              public router:Router,
              public loadingCtrl: LoadingController,
              public db:FirebaseDbService,
              public httpService:HttpServiceService) {


  }

  getIcon(name){
    let icon='';
    this.icons.forEach(item=>{
        if(item.name==name){
          icon=item.icon;
        }
    })
    return icon;
  }

  getColor(count){
    if(count==0){
      return '#4CAF50';
    }else if(count<5){
      return '#ffc107';
    }else{
      return '#f44336';
    }
  }

  async showLoader(){
    let loader = await this.loadingCtrl.create({
      message: 'Loading'
    });
    return loader;
  }

  async ngOnInit() {
    this.primaryColor=this.data.getThemeColor();
    this.logo=this.data.getLogo()
    this.getAlerts(JSON.parse(localStorage.getItem('category'))['_id']);
    this.loading = await this.loadingCtrl.create({
      message: 'Loading'
    });

    this.loading.present();
    this.httpService.getApi('icons').subscribe(res=>{
      if(res){
        this.icons=res;
      }
    })
  }

  getAlerts(categoryId){
    let areaId=this.data.getAreaCode();
    this.httpService.postApi({categoryId:categoryId,areaId:areaId},'alert/getAlertCondition').subscribe((res) => {

      if(res['success'] && res['data'].length){
        this.allAlerts = res['data'];
        // this.allAlerts=this.allAlerts.filter((item)=>{return item.isActive;})
        this.allAlerts.forEach(item=>{
          console.log(item._id)
          this.db.getDb().collection('alert',ref=>ref.where('documentName','==',item._id))
              .snapshotChanges().subscribe(res=>{
           if(res.length)
             this.mapAlertData(res[0].payload.doc.data())
          })

          this.db.getDb().collection('alertReport',ref=>ref.where('documentName','==',item._id))
              .snapshotChanges().subscribe(res=>{
            if(res.length)
              this.mapAlertReportData(res[0].payload.doc.data())
          })

        })
      }
    });
  }

  mapAlertReportData(data){
    this.alerts.forEach(alert=> {
      if(alert._id==data.alertId){
        alert.count=data.count;
      }
    })
    console.log({mapedAlerts:this.alerts})
    if(this.loading){
      this.loading.dismiss();
      this.loading=null;
    }

  }

  compare( a, b ) {
    if ( a.order < b.order ){
      return -1;
    }
    if ( a.order > b.order ){
      return 1;
    }
    return 0;
  }

  mapAlertData(data){
    this.allAlerts.forEach(alert=>{
        if(alert._id==data.documentName){
          alert.caption=data.caption;
          alert.isActive=data.isActive;
          alert.icon=data.icon;
          alert.order=data.order;
        }
    })
    this.alerts=this.allAlerts.filter((item)=>{return item.isActive});
    this.alerts.sort(this.compare)
  }

  getCharIcon(value){
    return value.slice(0,1).toUpperCase()
  }

  async selectCategory(category: any) {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading'
    });

    this.loading.present();
    const data = {
      alertId: category._id,
      status: 'reported'
    }
    this.httpService.postApi(data, 'alertStatus/createAlertStatus').subscribe((res) => {
      console.log(res);
      this.loading.dismiss();
      if(res['success']){
        console.log('success')
      }
    });
  }
}
