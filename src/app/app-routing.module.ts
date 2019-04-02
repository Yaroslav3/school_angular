import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from './auth/service/auth-guard.service';
import {StartComponent} from './start/start.component';


const routes: Routes = [

  {path: '', component: StartComponent},

  /**
   * admin child module.
   * **/
  {path: 'login', component: LoginComponent},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule', canLoad: [AuthGuardService]},


  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
