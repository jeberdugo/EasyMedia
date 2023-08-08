import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {

  formFilterMyMessages = new FormGroup({
    date: new FormControl(''),
  });

  myPosts:any = {};
  p: number = 1;
  sizeMyPosts = Object.keys(this.myPosts).length;
  todayDate : Date = new Date();

  constructor(private service:PostService, public router: Router) { }

  ngOnInit(): void {
    this.filterMyMessages();
  }
  
  filterMyMessages(){
    
    this.service.getPostsByIdAndDate(this.formFilterMyMessages.get('date')?.value)
    .subscribe(response => {
      this.myPosts = response;
      this.sizeMyPosts = Object.keys(this.myPosts).length;
    });

  }
}
