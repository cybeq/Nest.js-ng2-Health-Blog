import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
name:any
password:any
  constructor(private readonly userService:UserService) {}
async login(){
const res:any = await this.userService.login({name:this.name, password:this.password})
if(res.user && res.authorized){
  console.log('auth')
  return {auth:true}
}
  console.log('unauthorized')
  return {auth:false}
}
}
