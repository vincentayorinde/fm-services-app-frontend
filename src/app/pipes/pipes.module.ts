import { NgModule } from '@angular/core';
import { SearchFilterPipe } from './search-filter.pipe';
import { BillSearchPipe } from './bill-search.pipe';
import { PaymentSearchPipe } from './payment-search.pipe';
import { AdminRequestSearchPipe } from './admin-request-search.pipe';
import { AdminBillSearchPipe } from './admin-bill-search.pipe';
// import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SearchFilterPipe, BillSearchPipe, PaymentSearchPipe, AdminRequestSearchPipe, AdminBillSearchPipe],
  exports: [SearchFilterPipe, PaymentSearchPipe, BillSearchPipe, AdminRequestSearchPipe, AdminBillSearchPipe],
  imports: [
    // CommonModule
  ]
})
export class PipesModule { }
