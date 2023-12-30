import { UserDataService } from './../../service/user-data.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { LoginResponse } from '../../type/LoginReponse';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent {

  loginForm: FormGroup;
  constructor(private userData : UserDataService,private formBuilder: FormBuilder,private userService: UserService,private router: Router,private route:ActivatedRoute) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.authenticate(this.loginForm.value).subscribe({
        next: (value : LoginResponse) => {
          console.log(value);
          this.userData.setUsername(value.user.username);
          this.router.navigate(['/list-users']);
        },
        error: (err) => {
          console.log(err);
        }
      })
    } else {
      console.log('Form is invalid');
    }
  }
}
