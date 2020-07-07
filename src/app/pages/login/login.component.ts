import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/auth/login.service';
import { StorageService } from 'src/app/auth/storage.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitted: Boolean = false;
  public errorLogin: Boolean = false;

  constructor(private formBuilder: FormBuilder,
    private _loginService: LoginService,
    private storageService: StorageService,
    private router: Router,
    private socketService: SocketService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  get form() { return this.loginForm.controls; }

  submitLogin() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this._loginService.login(this.loginForm.value)
      .subscribe(
        data => {
          this.correctLogin(data);
        },
        error => {
          this.errorLogin = true;
        }
      );
  }

  private correctLogin(data:User){
    this.socketService.connect();
    this.storageService.setCurrentSession(data);
    this.router.navigate(['/inicio']);
  }


}
