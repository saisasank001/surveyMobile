import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChecklistCategoriesPage } from './checklist-categories.page';

const routes: Routes = [
  {
    path: '',
    component: ChecklistCategoriesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChecklistCategoriesPage]
})
export class ChecklistCategoriesPageModule {}
