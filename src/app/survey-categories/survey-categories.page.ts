import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../http-service.service';
import {FirebaseDbService} from "../firebase-db.service";
import {AlertController, MenuController} from "@ionic/angular";
import {DataService} from "../data.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-survey-categories',
  templateUrl: './survey-categories.page.html',
  styleUrls: ['./survey-categories.page.scss'],
})
export class SurveyCategoriesPage implements OnInit {

  categories=[];
  finalCategories=[];
  surveys=[];
  color;
  selectedId='';
    mappedData={};
  constructor(public http: HttpServiceService,
              public menu: MenuController,
              public data:DataService,
              public router:Router,
              public alertCtrl:AlertController,
              public firebase:FirebaseDbService
              ) {
      this.menu.enable(false)
      this.menu.close()
      this.color=this.data.getThemeColor()
  }



  ngOnInit() {
    this.getCategories().then(res=>{
        this.getSurveys().then(res=>{
            this.surveys.forEach(survey=>{
                this.mapSurvey(survey._id);
            })
            this.mapData();
        })
    })
  }

  mapSurvey=(id)=>{
      this.firebase.getDb().collection('suvery',ref=>ref.where('documentName','==',id))
          .snapshotChanges().subscribe(res=>{
          if(res.length)
              this.mapSurveyData(res[0].payload.doc.data())
      })
  }

  mapSurveyData=(data)=>{
        this.surveys.forEach(survey=>{

            if(survey._id==data.documentName){
                survey.isActive=data.isActive;
                survey.expiresOn=new Date(data.expiresOn.seconds*1000).toISOString()
                survey.startsOn=new Date(data.startsOn.seconds*1000).toISOString();
                let json={};
                this.categories.forEach(category=>{
                    if(!json[category._id]){
                        json[category._id]=[];
                    }
                    console.log(this.surveys)
                    json[category._id]=this.getSurvey(category._id)
                })
                this.mappedData=json;
                return;
            }
        })
  }

  mapCategory=(data)=>{
      this.categories.forEach(category=>{
          if(category._id==data.documentName){
              category.isActive=data.isActive;
              this.finalCategories=this.categories.filter(el=>{return el.isActive==true; })
              return;
          }
      })
  }

  fetchFireCategory=(id)=>{
      this.firebase.getDb().collection('categories',ref=>ref.where('documentName','==',id))
          .snapshotChanges().subscribe(res=>{
              if(res.length)
              this.mapCategory(res[0].payload.doc.data())
      })
  }


  mapData=()=>{
      let json={};
      this.finalCategories=this.categories.filter(el=>{return el.isActive==true; })
      this.categories.forEach(category=>{
            this.fetchFireCategory(category._id)
            if(!json[category._id]){
                json[category._id]=[];
            }
            json[category._id]=this.getSurvey(category._id)
      })
      this.mappedData=json;
      if(this.categories.length){
          this.selectedId=this.categories[0]._id;
      }

  }

  getSurvey=(id)=>{
     return this.surveys.filter((el)=>{return (el.categoryId==id && el.isActive==true && this.canActivate(el.startsOn,el.expiresOn));});
  }

    getMonth(date) {
        var month = date.getMonth() + 1;
        return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
    }

    canActivate(StartsOn,ExpiresOn){
      return true;
        StartsOn=StartsOn.replace('Z','');
        StartsOn=StartsOn.split('.')[0].split('T');
        ExpiresOn=ExpiresOn.replace('Z','');
        ExpiresOn=ExpiresOn.split('.')[0].split('T');

        var today = new Date();

        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var str1 = StartsOn[1],
            str2 = time,
            str3= ExpiresOn[1],
            todayDate=today.getFullYear()+'-'+this.getMonth(today)+'-'+today.getDate();

        if(todayDate==StartsOn[0]){
            if(todayDate==ExpiresOn[0]){
                if(str3>str2){
                    if(str1<=str2){
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            }else{
                if(str1<=str2){

                    return true;
                }else{
                    return false;
                }
            }
        }else{
            if(new Date(todayDate)<new Date(StartsOn[0])){
                return false;
            }else{
                if(new Date(todayDate)>new Date(ExpiresOn[0])){
                    return false;
                }else{
                    return true;
                }
            }
        }

    }

  getCategories = () => {
    return new Promise(resolve => {
        this.http.postApi({}, 'categories/getCategoriesCondition').subscribe(res=>{
            if(res.success)
            this.categories=res.data;
            resolve(1)
        })
    })

  }

  getSurveys=()=>{
      return new Promise(resolve => {
          this.http.postApi({}, 'survey/getSurveyCondition').subscribe(res=>{
              if(res.success)
              this.surveys=res.data;
              resolve(1)
          })
      });

  }

    loadCategory(_id: any) {
        this.selectedId=_id;
    }

    openMenu() {
        this.menu.enable(true);
        this.menu.open();
    }

    selectItem(item: any) {
        if(this.canActivate(item.startsOn,item.expiresOn)){
            localStorage.setItem('survey',JSON.stringify(item));
            this.router.navigateByUrl('/survey-submit')
        }else{
            this.presentAlert();
            item.isActive=false;
        }

    }

    async presentAlert() {
        const alert = await this.alertCtrl.create({
            header: 'Error',
            subHeader: '',
            message: 'Sorry survey got expired.',
            buttons: ['OK']
        });

        await alert.present();
    }

}
