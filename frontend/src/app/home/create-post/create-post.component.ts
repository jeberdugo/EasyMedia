import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  submitted = false;
  posts:any = {};
  todayDate : Date = new Date();
  formCreateMessage = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    messages: new FormControl('', [Validators.required, Validators.maxLength(300)]),
  });

  constructor(private service:PostService, public router: Router) { }

  ngOnInit(): void {

  }

  closeModal(){
    let modal = document.getElementById("modalSuccess") as HTMLElement;
      if (modal != undefined) {
        modal.style.display = "none";
      }
      this.router.navigate(['home/my-posts']);

  }
  closeModalClose(){
    let modal = document.getElementById("modalClose") as HTMLElement;
      if (modal != undefined) {
        modal.style.display = "none";
      }
  }
  
  post(){
    this.submitted = true;

    this.service.createPost(this.formCreateMessage.get('title')?.value, this.formCreateMessage?.get('messages')?.value)
    .subscribe(response => {
      this.posts = response;
      let modal = document.getElementById("modalSuccess") as HTMLElement;
      if (modal != undefined) {
        modal.style.display = "block"; 
      }
    },
    error => { 
      let modal = document.getElementById("modalClose") as HTMLElement;
      if (modal != undefined) {
        modal.style.display = "block"; 
      }
    });

    
  }

}
