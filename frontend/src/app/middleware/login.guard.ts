import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable} from "rxjs";
import {UserService} from "../services/user.service";

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.isLoggedIn().pipe(
      map((res: any) => {
        if (!res.user) {
          return true;
        } else {
          this.router.navigate(['/panel/writer'])
          return false;
        }
      })
    );
  }
}
