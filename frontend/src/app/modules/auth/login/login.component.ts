import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonMethods } from 'src/app/common-methods';
import { OthersService } from 'src/app/services/others.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private otherService:OthersService,private _toastrService: ToastrService,
    private _router: Router,
    private fb: FormBuilder,) { 
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }

    onSubmit() {
      if (this.loginForm.invalid) {
        return;
      }
  
      const loginData = this.loginForm.value;
      this.otherService.login(loginData).subscribe({
        next: (response) => {
          if (response.authenticate) {
            // Store user details in localStorage
            CommonMethods.setItem('name',response.name)
            CommonMethods.setItem('email', response.email);
            CommonMethods.setItem('role', response.role);
            CommonMethods.setItem("auth", true);
  
            // Redirect to dashboard
            this._router.navigate(['dashboard']).then(() => {
              window.location.reload();  // Force a full page reload
            });
            this._toastrService.success("Welcome back! Logged in securely!");
          } else {
            this.errorMessage = 'Invalid credentials!';
            this._toastrService.error('Login failed. Please try again.');
          }
        },
        error: (error) => {
          console.error('Login failed', error);
          // this.errorMessage = 'Login failed. Please try again.';
          this._toastrService.error('Invalid credentials!');
        }
      });
    }

}
