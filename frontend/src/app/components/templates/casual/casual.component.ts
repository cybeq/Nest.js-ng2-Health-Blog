import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-casual',
  templateUrl: './casual.component.html',
  styleUrls: ['./casual.component.css']
})
export class CasualComponent implements OnInit{
  @Input() title: string | undefined;
  @Input() content: string | undefined;
  @Input() author: string | undefined;
  @Input() photos: string[] | undefined;
  halfLength:number = 0 ;
 constructor() {

 }

 ngOnInit() {
   // @ts-ignore
   this.halfLength = Math.floor(this.content.length / 2);
    // @ts-ignore
   if(this.halfLength > 800){
     // @ts-ignore
     const firstHalf = this.content.substring(0, this.halfLength);
     // @ts-ignore
     const secondHalf = this.content.substring(this.halfLength);
   }

 }

}
