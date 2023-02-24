import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
name:any
password:any
  constructor(private readonly userService:UserService, private router:Router) {}
async login(){
const res:any = await this.userService.login({name:this.name, password:this.password})
if(res.user && res.authorized){
  this.router.navigate(['/panel/writer'])
  return {auth:true}
}
  console.log('unauthorized')
  return {auth:false}
}
}
