import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { fakeBackendProvider } from './_helpers/';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeModule} from './home';
import { LoginComponent} from './login';
import { MarvelListComponent } from './marvel-list/marvel-list.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports:[
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    HomeModule
  ],
  declarations:[
    AppComponent,    
    LoginComponent, MarvelListComponent, DetailComponent   
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule{};