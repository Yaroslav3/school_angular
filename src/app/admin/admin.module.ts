import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {AdminHomeComponent} from './admin-home/admin-home.component';
import {AdminHeaderComponent} from './admin-header/admin-header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AdminComponent} from './admin/admin.component';
import {BsDatepickerModule, ModalModule} from 'ngx-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [

  {path: '', component: AdminComponent},
  {path: 'admin', component: AdminHomeComponent },
];


@NgModule({
  declarations: [AdminHomeComponent, AdminHeaderComponent, AdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgbModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
  ],
  exports: [RouterModule]
})
export class AdminModule {
}
