import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './refactored-spoon/components/user/login/login.component';
import { AuthGuardService as AuthGuard } from './refactored-spoon/services/auth-guard/auth-guard.service';
import { RecordsComponent } from './refactored-spoon/components/records/records.component';
import { MealsComponent } from './refactored-spoon/components/meals/meals/meals.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { 
    path: 'records',
    component: RecordsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'meals',
    component: MealsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
