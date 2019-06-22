import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "staff-dashboard",
    loadChildren:
      "./staff-dashboard/staff-dashboard.module#StaffDashboardPageModule"
  },
  {
    path: "customer-requests",
    loadChildren:
      "./customer-requests/customer-requests.module#CustomerRequestsPageModule"
  },
  {
    path: "customer-request/:request-detail",
    loadChildren:
      "./customer-requests/request-detail/request-detail.module#RequestDetailPageModule"
  },
  {
    path: "create-bill/:create-bill",
    loadChildren: "./create-bill/create-bill.module#CreateBillPageModule"
  },
  {
    path: "customer-bills",
    loadChildren:
      "./customer-bills/customer-bills.module#CustomerBillsPageModule"
  },
  {
    path: "preview-bill",
    loadChildren:
      "./create-bill/preview-bill/preview-bill.module#PreviewBillPageModule"
  },
  {
    path: "customer-payments",
    loadChildren:
      "./customer-payments/customer-payments.module#CustomerPaymentsPageModule"
  },
  {
    path: "customer-payments/:customer-payment-detail",
    loadChildren:
      "./customer-payments/customer-payment-detail/customer-payment-detail.module#CustomerPaymentDetailPageModule"
  },
  {
    path: "customer-bills/:customer-bill-detail",
    loadChildren:
      "./customer-bills/customer-bill-detail/customer-bill-detail.module#CustomerBillDetailPageModule"
  },
  {
    path: "register",
    loadChildren: "./public/register/register.module#RegisterPageModule"
  },
  {
    path: "all-users",
    loadChildren: "./all-users/all-users.module#AllUsersPageModule"
  },
  {
    path: "all-users/:user-detail",
    loadChildren:
      "./all-users/user-detail/user-detail.module#UserDetailPageModule"
  },  { path: 'add-user', loadChildren: './add-user/add-user.module#AddUserPageModule' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule {}
