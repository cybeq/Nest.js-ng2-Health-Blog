import { Injectable } from '@angular/core';
import{HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http:HttpClient) { }

  async login(params: { password: any; name: void }) {
      return await this.http.post(`/api/user/login`,params).toPromise()
  }
}
