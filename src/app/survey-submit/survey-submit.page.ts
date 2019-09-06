import { Component, OnInit } from '@angular/core';
import {AlertController, MenuController} from "@ionic/angular";
import {DataService} from "../data.service";
import {HttpServiceService} from "../http-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-survey-submit',
  templateUrl: './survey-submit.page.html',
  styleUrls: ['./survey-submit.page.scss'],
})
export class SurveySubmitPage implements OnInit {

  index=0;
  color='red';
  question=[];
  constructor(public menu:MenuController,
              public router:Router,
              public http:HttpServiceService,
              public alertController:AlertController,public dataService:DataService) {
    this.question=JSON.parse(localStorage.getItem('survey'))['dynamicForm'];
    if(JSON.parse(localStorage.getItem('survey'))['contactShow']){
      this.question.push({
        Title:'Please give your contact details',
        canSkip:JSON.parse(localStorage.getItem('survey'))['contactConfigure']=='mandatory'?false:true,
        ResponseType:'submit',
        email:'',
        mobile:''
      });
    }
    this.menu.enable(false)
    if(this.question[this.index]['ResponseType']=='linearScale' && !this.question[this.index]['DynamicForm']['answer']){
      this.question[this.index]['DynamicForm']['answer']=1;
      this.question[this.index]['enable']=true;
    }
    else if(this.question[this.index]['ResponseType']=='checkbox'){
      if(!this.question[this.index]['DynamicForm']['answer'] || (this.question[this.index]['DynamicForm']['answer'] && this.question[this.index]['DynamicForm']['answer'].length))
        this.question[this.index]['checkbox'].forEach(item=>{
          if(!this.question[this.index]['DynamicForm']['answer']){
            this.question[this.index]['DynamicForm']['answer']=[]
          }
          this.question[this.index]['DynamicForm']['answer'].push();
        })
    }else if(this.question[this.index]['ResponseType']=='multi'){
      this.question[this.index]['multi'].forEach(item=>{
        if(!this.question[this.index]['DynamicForm']['answer']){
          this.question[this.index]['DynamicForm']['answer']=[]
        }
        this.question[this.index]['DynamicForm']['answer'].push();
      })
    }
  }

  ngOnInit() {
  }

  prevQuestion() {
    if(this.index<1){
      this.presentAlert();
      return;
    }
    this.index-=1;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Oops! there are no previous questions',
      buttons: ['OK']
    });

    await alert.present();
  }

  async nextQuestion() {
    console.error({question:this.question,index:this.index});
    if(!this.question[this.index].canSkip && (!(Array.isArray(this.question[this.index]['DynamicForm']['answer'])&&this.question[this.index]['DynamicForm']['answer'].length)) && (!this.question[this.index]['DynamicForm']['answer'] && !this.question[this.index]['enable'])){
      const alert =  await this.alertController.create({
        header: 'Error',
        message: 'Sorry! You cannot skip without answering',
        buttons: ['OK']
      });

      await alert.present();
      return;
    }

    this.index+=1;

    if(this.question[this.index]['ResponseType']=='linearScale' && !this.question[this.index]['DynamicForm']['answer']){
      this.question[this.index]['DynamicForm']['answer']=1;
      this.question[this.index]['enable']=true;
    }
    else if(this.question[this.index]['ResponseType']=='checkbox'){
      if(!this.question[this.index]['DynamicForm']['answer'] || (this.question[this.index]['DynamicForm']['answer'] && this.question[this.index]['DynamicForm']['answer'].length))
      this.question[this.index]['checkbox'].forEach(item=>{
        if(!this.question[this.index]['DynamicForm']['answer']){
          this.question[this.index]['DynamicForm']['answer']=[]
        }
        this.question[this.index]['DynamicForm']['answer'].push();
      })
    }else if(this.question[this.index]['ResponseType']=='multi'){
      this.question[this.index]['multi'].forEach(item=>{
        if(!this.question[this.index]['DynamicForm']['answer']){
          this.question[this.index]['DynamicForm']['answer']=[]
        }
        this.question[this.index]['DynamicForm']['answer'].push();
      })
    }
  }

  rating(number: number) {
    this.question[this.index]['DynamicForm']['answer']=number;
    this.question[this.index]['enable']=true;
  }

  getFormattedData(from,to,set) {

    return {
      floor:from,
      ceil: to,
      showTicks: set == 1 ? true : false
    }
  }

  setSmiley(number: number) {
    this.question[this.index]['DynamicForm']['answer']=number;
    this.question[this.index]['enable']=true;
  }

  selectTag(tag) {
    if(!tag.selected)
    tag.selected=true;
    else
      tag.selected=false;
    this.question[this.index]['enable']=true;
  }

  selectThumb(up: string) {
    this.question[this.index]['DynamicForm']['answer']=up;
    this.question[this.index]['enable']=true;
  }

  changeRadio(question: any, radio: any) {
    question.enable=true;
    this.question[this.index]['DynamicForm']['answer']=radio;
  }

  async submit(){
    if(JSON.parse(localStorage.getItem('survey'))['contactShow'] && JSON.parse(localStorage.getItem('survey'))['contactConfigure']=='mandatory') {
      if(this.question[this.index]['mobile'] && this.question[this.index]['email']){
      }else{
        const alert =  await this.alertController.create({
          header: 'Error',
          message: 'Sorry! You cannot skip without answering',
          buttons: ['OK']
        });

        await alert.present();
        return;
      }
    }
    this.doSubmit();
  }

  async presentSuccessAlert(header,message) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: '',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
    setTimeout(()=>{
      this.router.navigateByUrl('/home');
    },5000);
    alert.dismiss();
  }

  doSubmit(){
    let data=JSON.parse(localStorage.getItem('survey'))
    let json={
      categoryId: data.categoryId,
      surveyId: data._id,
      finalSubmitDynamicForm: this.question,
      location: this.dataService.getLocation()['_id'],
      formTitle: data.title,
      createdBy:this.dataService.getDeviceId()
    }
    this.http.postApi(json,'surveyResponse/createSurveyResp').subscribe(res=>{
      this.presentSuccessAlert('Success','Successfully submitted your response.')

    },err=>{
      this.presentSuccessAlert('Error','Something went wrong, please try again.')
    })
  }

}
