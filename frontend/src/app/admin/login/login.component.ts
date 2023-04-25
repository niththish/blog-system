import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorResponse: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = fb.group({
      username: [, [Validators.required, Validators.pattern('^[a-zA-Z]{4,}$')]],
      password: [, [Validators.required]],
    });
  }

  get userName() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    const payload = this.loginForm.value;
    this.loginService.login(payload).subscribe({
      next: (data) => {
        const token = data.token;
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigate(['/admin', 'blogs']);
        } else {
          this.errorResponse = data?.reason ?? '';
          setTimeout(() => {
            this.errorResponse = '';
          }, 2500);
        }
      },
      error: (err) => {},
    });
    this.loginForm.reset();
  }

  ngOnInit(): void {}
}
