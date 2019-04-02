import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {httpInterceptorProviders} from './auth/auth-intrcerptor';
import {AuthGuardService} from './auth/service/auth-guard.service';
import {RouterModule} from '@angular/router';
import { StartComponent } from './start/start.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    RouterModule,
    ModalModule.forRoot(),
  ],
  providers: [httpInterceptorProviders, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
