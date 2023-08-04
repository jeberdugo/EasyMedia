import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted:boolean = false;
  fieldTextType: boolean = false;

  constructor() { }

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  

  ngOnInit(): void {
  }

  login(){
    this.submitted = true;
   this.formLogin.markAllAsTouched();

    if (this.formLogin.valid)
      console.log(this.formLogin);
    else
    console.log("Hay datos inválidos en el formulario");
  }

  togglePasswordVisibility() {
    this.fieldTextType = !this.fieldTextType;
  }

}
