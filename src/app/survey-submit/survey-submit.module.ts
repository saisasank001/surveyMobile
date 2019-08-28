import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SurveySubmitPage } from './survey-submit.page';
import {Ng5SliderModule} from "ng5-slider";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

const routes: Routes = [
  {
    path: '',
    component: SurveySubmitPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        Ng5SliderModule,
        FontAwesomeModule
    ],
  declarations: [SurveySubmitPage]
})
export class SurveySubmitPageModule {}
