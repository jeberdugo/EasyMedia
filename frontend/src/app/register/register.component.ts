import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  fieldTextType: boolean = false;
  fieldTextTypeConfirm: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  formRegister = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      this.MyCustomValidator,
    ]),
    name: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

  register() {
    this.submitted = true;
    this.formRegister.markAllAsTouched();

    if (this.formRegister.valid) {
      this.userService
        .registerUser(
          this.formRegister.get('name')?.value,
          this.formRegister.get('email')?.value,
          this.formRegister.get('password')?.value
        )
        .subscribe(
          (response: any) => {
            console.log('User registered successfully:', response);
            this.login();
            // Add any additional logic here (e.g., navigate to a different page)
          },
          (error: any) => {
            console.error('Error registering user:', error);
            // Handle error (e.g., display an error message to the user)
          }
        );
    } else console.log('Hay datos inválidos en el formulario');
  }


  login() {
      this.userService
        .login(
          this.formRegister.get('email')?.value,
          this.formRegister.get('password')?.value
        )
        .subscribe(
          (res: any) => {
           if (res['token']) {
            localStorage.setItem('token', res['token']); //token here is stored in a local storage
          }
          this.router.navigate(['/home']);

          },
          (error: any) => {
            console.error('Error registering user:', error);
            // Handle error (e.g., display an error message to the user)
          }
        );

  }
  togglePasswordVisibility(element: any) {
    if (element === 'confirm') {
      this.fieldTextTypeConfirm = !this.fieldTextTypeConfirm;
    } else {
      this.fieldTextType = !this.fieldTextType;
    }
  }

  MyCustomValidator(control: AbstractControl) {
    let isValid = false;

    if (control.parent?.get('password')?.value === control.value) {
      isValid = true;
    }

    return isValid ? null : { notequal: 'This value is invalid' };
  }
}
