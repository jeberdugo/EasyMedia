import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  menuOn = false;
  selectedMenu = 'create';
  name= '';
  
  menuTitle = "Create message";

  constructor(private service:PostService, private userService: UserService, public router: Router) { }

  ngOnInit(): void {
    this.name = this.userService.getClaim("name");
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


  logout(){
      localStorage.removeItem('token');
      this.router.navigate(['login']);
  }

}
