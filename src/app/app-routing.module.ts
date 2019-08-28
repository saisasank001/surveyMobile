import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'get-tenant-code', loadChildren: './get-tenant-code/get-tenant-code.module#GetTenantCodePageModule' },
  { path: 'get-passcode', loadChildren: './get-passcode/get-passcode.module#GetPasscodePageModule' },
  { path: 'survey-categories', loadChildren: './survey-categories/survey-categories.module#SurveyCategoriesPageModule' },
  { path: 'survey-submit', loadChildren: './survey-submit/survey-submit.module#SurveySubmitPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
