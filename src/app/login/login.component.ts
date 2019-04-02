import {Component, OnInit} from '@angular/core';
import {AuthLoginInfo} from '../auth/model/AuthLoginInfo';
import {AuthService} from '../auth/service/auth.service';
import {TokenStorageService} from '../auth/service/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './login.adaptive.component.scss']
})
export class LoginComponent implements OnInit {


  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit() {
    this.loginInfo = new AuthLoginInfo(this.form.email, this.form.password);
    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.email);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['admin']);
      },
      error => {
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

}
