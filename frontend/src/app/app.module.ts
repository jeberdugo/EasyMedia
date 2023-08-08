import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import {CustomDatePipe} from './custom.datepipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { AuthGuard } from './auth.guard';
import * as $ from 'jquery';
import * as bootstrap from "bootstrap";
import { CreatePostComponent } from './home/create-post/create-post.component';
import { MyPostsComponent } from './home/my-posts/my-posts.component';
import { AllPostsComponent } from './home/all-posts/all-posts.component';
import { HighlightPipe } from './home/highlight.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CustomDatePipe,
    CreatePostComponent,
    MyPostsComponent,
    AllPostsComponent,
    HighlightPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService, AuthGuard],
  bootstrap: [AppComponent,]
})
export class AppModule { }
