import { NgModule } from '@angular/core';
import { SearchFilterPipe } from './search-filter.pipe';
import { BillSearchPipe } from './bill-search.pipe';
import { PaymentSearchPipe } from './payment-search.pipe';
import { AdminRequestSearchPipe } from './admin-request-search.pipe';
import { AdminBillSearchPipe } from './admin-bill-search.pipe';
import { AdminPaymentSearchPipe } from './admin-payment-search.pipe';
import { AllUsersSearchPipe } from './all-users-search.pipe';
// import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SearchFilterPipe, BillSearchPipe, PaymentSearchPipe, AdminRequestSearchPipe, AdminBillSearchPipe, AdminPaymentSearchPipe, AllUsersSearchPipe],
  exports: [SearchFilterPipe, PaymentSearchPipe, BillSearchPipe, AdminRequestSearchPipe, AdminBillSearchPipe, AdminPaymentSearchPipe, AllUsersSearchPipe],
  imports: [
    // CommonModule
  ]
})
export class PipesModule { }
