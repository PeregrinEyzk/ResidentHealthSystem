import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static isloged = false;
  login(password:string):boolean{
    if("123456"===password){
      AuthService.isloged = true;
      localStorage.setItem('isloged',"true")
      return true;
    }
    return false;
  }
  logout():any{
    localStorage.removeItem('isloged')
  }
  IsLogedIn():boolean{
    return AuthService.isloged;
  };

}
