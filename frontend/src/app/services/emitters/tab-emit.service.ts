import {EventEmitter, Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TabEmitService {
  activeTabEmitter = new EventEmitter<string>();
  activePage:any
  constructor() {

  };
}
