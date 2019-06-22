import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CustomerPaymentDetailPage } from './customer-payment-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerPaymentDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CustomerPaymentDetailPage]
})
export class CustomerPaymentDetailPageModule {}
