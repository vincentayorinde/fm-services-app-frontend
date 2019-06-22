import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'request', loadChildren: './request/request.module#RequestPageModule' },
  { path: 'messages', loadChildren: './messages/messages.module#MessagesPageModule' },
  { path: 'bills', loadChildren: './bills/bills.module#BillsPageModule' },
  { path: 'payments', loadChildren: './payments/payments.module#PaymentsPageModule' },
  { path: 'bills/:bill-detail', loadChildren: './bills/bill-detail/bill-detail.module#BillDetailPageModule' },
  { path: 'all-requests', loadChildren: './all-requests/all-requests.module#AllRequestsPageModule' },
  { path: 'payments/:payment-detail', loadChildren: './payments/payment-detail/payment-detail.module#PaymentDetailPageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'all-request/:request-detail', loadChildren: './all-requests/detail/detail.module#DetailPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
