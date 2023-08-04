import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  submitted:boolean = false;
  fieldTextType: boolean = false;
  fieldTextTypeConfirm: boolean = false;

  constructor() { }

  

  formRegister = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [ Validators.required, this.MyCustomValidator ]),
    name:  new FormControl('', [Validators.required])
  }, 
    );
  

  ngOnInit(): void {
  }

  register(){
    this.submitted = true;
   this.formRegister.markAllAsTouched();

    if (this.formRegister.valid)
      console.log(this.formRegister.value);
    else
    console.log("Hay datos inválidos en el formulario");
  }

  togglePasswordVisibility(element: any) {
    if(element === 'confirm'){
      this.fieldTextTypeConfirm = !this.fieldTextTypeConfirm;
    }
    else{
      this.fieldTextType = !this.fieldTextType;
    }
  }

   MyCustomValidator(control: AbstractControl){ 
    let isValid = false;

    if (control.parent?.get('password')?.value === control.value) {
      isValid = true;
  }

    return isValid ? null : { 'notequal': 'This value is invalid' }; 
   }


}
