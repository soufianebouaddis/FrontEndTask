import { Routes } from '@angular/router';
import { LoginpageComponent } from './component/loginpage/loginpage.component';
import { ListusersComponent } from './component/listusers/listusers.component';

export const routes: Routes = [
   { path: 'login', component: LoginpageComponent },
  { path: 'list-users', component: ListusersComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
