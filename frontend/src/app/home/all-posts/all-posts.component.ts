import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {
  formFilterMessages = new FormGroup({
    word: new FormControl(''),
    date: new FormControl('')
  });
  todayDate : Date = new Date();
  posts:any= {};
  p: number = 1;
  keyword: string = 'sad';

  constructor(private service:PostService, public router: Router) { }

  ngOnInit(): void {
    this.getMessages();
  }

  

  filterMessages(){
    if(this.formFilterMessages.get('word')?.value == '' && this.formFilterMessages.get('date')?.value == ''){
      this.getMessages();
      return;
    }
    this.service.getPostsByWordAndDate(this.formFilterMessages.get('word')?.value, this.formFilterMessages.get('date')?.value)
    .subscribe(response => {
      this.posts = response;
    });
  }

  getMessages(){
    this.service.getPosts()
    .subscribe(response => {
      this.posts = response;
    });
  }

}
