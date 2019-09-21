import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WorkingAreasPage } from './working-areas.page';

const routes: Routes = [
  {
    path: '',
    component: WorkingAreasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WorkingAreasPage]
})
export class WorkingAreasPageModule {}
