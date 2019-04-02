import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {TokenStorageService} from './token-storage.service';


@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthGuardService implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) {
  }

  canLoad(route: Route): boolean {
    const token = this.tokenStorage.getToken();
    console.log(token);
    console.log('_____________AlwaysAuthGuard 1____________');

    if (token == null) {
      this.router.navigate([this.authService.getLoginUrl()]);
    } else {

      return true;
    }
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.tokenStorage.getToken();
    console.log('   _::_   ' + token);
    if (token == null) {
      return false;
    }

    return true;
  }
}
