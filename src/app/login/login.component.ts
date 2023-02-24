import { Component, OnInit } from '@angular/core';
import { account } from '../mock_account';
import {
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
} from '@angular/forms';
// import { Validator,Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'angular-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorPassSubject: BehaviorSubject<string> = new BehaviorSubject<string>("")

  errorPass$: Observable<string> = this.errorPassSubject.asObservable();

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    var username = this.loginForm.get("email")?.value
    var password = this.loginForm.get("password")?.value
  
    if (password.length < 8) {
      this.errorPassSubject.next("Mật khẩu phải dài từ 8 ký tự")
      return;
    }

    if (username == account.username && account.password) {
      this.authService.saveUser(username, password);
      this.router.navigate(['']);
    } else {

    }
    
  }
}
