import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { CreatePostComponent } from './home/create-post/create-post.component';
import { MyPostsComponent } from './home/my-posts/my-posts.component';
import { AllPostsComponent } from './home/all-posts/all-posts.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard],
  children: [
    {
       path: 'create-post',
       component: CreatePostComponent
    },
    {
       path: 'my-posts',
       component: MyPostsComponent
    } ,
    {
       path: 'all-posts',
       component: AllPostsComponent
    },
    { path: '**', redirectTo: 'all-posts' }
]},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { 
}
