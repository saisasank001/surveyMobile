import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SurveyCategoriesPage } from './survey-categories.page';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

const routes: Routes = [
  {
    path: '',
    component: SurveyCategoriesPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        FontAwesomeModule
    ],
  declarations: [SurveyCategoriesPage]
})
export class SurveyCategoriesPageModule {}
