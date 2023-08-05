import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  fieldTextType: boolean = false;

  constructor(private userService: UserService,  private router: Router) {}

  formLogin = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  ngOnInit(): void {}

  login() {
    this.submitted = true;
    this.formLogin.markAllAsTouched();

    if (this.formLogin.valid){
      this.userService
        .login(
          this.formLogin.get('email')?.value,
          this.formLogin.get('password')?.value
        )
        .subscribe(
          (res: any) => {
           if (res['token']) {
            localStorage.setItem('token', res['token']); //token here is stored in a local storage
          }
          this.router.navigate(['/home']);
            // Add any additional logic here (e.g., navigate to a different page)
          },
          (error: any) => {
            console.error('Error registering user:', error);
            // Handle error (e.g., display an error message to the user)
          }
        );
    }
    else console.log('Hay datos inválidos en el formulario');
  }

  togglePasswordVisibility() {
    this.fieldTextType = !this.fieldTextType;
  }
}
