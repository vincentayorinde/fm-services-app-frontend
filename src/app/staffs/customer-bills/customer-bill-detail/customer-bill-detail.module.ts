import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CustomerBillDetailPage } from './customer-bill-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerBillDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CustomerBillDetailPage]
})
export class CustomerBillDetailPageModule {}
