import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthInterceptor } from './interceptors/basicauthinterceptor';

import { AgmCoreModule } from '@agm/core';
import { PipesModule } from './pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { HeaderComponent } from './layout/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    //HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PipesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBT8zGRY3VHICCuxEetWXc_F-50-o8Vo2Y'
      /* apiKey is required, unless you are a 
      premium customer, in which case you can 
      use clientId 
      */
    }),
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
