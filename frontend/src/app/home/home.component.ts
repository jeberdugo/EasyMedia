import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  menuOn = false;
  selectedMenu = 'create';
  submitted = false;
  menuTitle = "Create message";
  todayDate : Date = new Date();
  posts:any= {};
  myPosts:any = {};
  p: number = 1;

  sizeMyPosts = Object.keys(this.myPosts).length;

  formCreateMessage = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    messages: new FormControl('', [Validators.required, Validators.maxLength(300)]),
  });

  formFilterMyMessages = new FormGroup({
    date: new FormControl(''),
  });

  formFilterMessages = new FormGroup({
    word: new FormControl(''),
    date: new FormControl('')
  });
  
  constructor(private service:PostService) { }

  ngOnInit(): void {
    this.service.getPosts()
    .subscribe(response => {
      this.posts = response;
    });
  }

  toogleMenu(element:string){
    if(element === 'button'){
      this.menuOn = !this.menuOn;
    }
    else{
      if(this.menuOn === true){
        this.menuOn = !this.menuOn;
      }
    }
    
  }

  post(){
    this.submitted = true;
    
  }

  filterMyMessages(){

  }

  filterMessages(){

  }
  menuChange(menuElement: string){
    this.selectedMenu = menuElement;
  }

  logout(){

  }

}
