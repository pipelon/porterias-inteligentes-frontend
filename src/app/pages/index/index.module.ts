import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { Routes, RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from 'src/app/layout/header/header.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
];
@NgModule({
  declarations: [IndexComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgmCoreModule,
    PipesModule,
    NgbModule
  ],
  exports: [
    RouterModule
  ]
})
export class IndexModule { }
