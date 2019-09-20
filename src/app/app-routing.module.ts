import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './public/register/register.module#RegisterPageModule' },
  { path: 'customers', loadChildren: './customers/customer-routing.module#CustomerRoutingModule'},
  { path: 'logout', loadChildren: './public/logout/logout.module#LogoutPageModule' },
  { path: 'staffs', loadChildren: './staffs/staff-routing.module#StaffRoutingModule' },
  { path: 'recover', loadChildren: './public/recover/recover.module#RecoverPageModule' },
  { path: 'reset-password', loadChildren: './public/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'verify', loadChildren: './public/verify/verify.module#VerifyPageModule' },
  { path: 'instruction', loadChildren: './public/instruction/instruction.module#InstructionPageModule' },
  { path: 'about', loadChildren: './public/about/about.module#AboutPageModule' },
  { path: 'services', loadChildren: './public/about/services/services.module#ServicesPageModule' },
  { path: 'working-areas', loadChildren: './public/about/working-areas/working-areas.module#WorkingAreasPageModule' },
  { path: 'why-us', loadChildren: './public/about/why-us/why-us.module#WhyUsPageModule' },
  { path: 'contact', loadChildren: './public/contact/contact.module#ContactPageModule' },
  { path: 'introduction', loadChildren: './public/introduction/introduction.module#IntroductionPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
