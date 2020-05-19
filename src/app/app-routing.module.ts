import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './auth/login.guard';


const routes: Routes = [
  { path: 'inicio', loadChildren: './pages/index/index.module#IndexModule', canActivate: [ LoginGuard ] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
