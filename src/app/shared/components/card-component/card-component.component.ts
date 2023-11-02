import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/core/interfaces/item';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.scss'],
})
export class CardComponentComponent  implements OnInit {
  @Input() item:Item | null=null;
  @Output() onCardClicked:EventEmitter<void> = new EventEmitter<void>();
  @Output() onDeleteClicked:EventEmitter<void> = new EventEmitter<void>();

  private _name:string = "";
@Input() set name(new_name:string) {
	this._name = new_name
}
get name():string {
	return this._name
}

private _description:string = "";
@Input() set description(new_description:string) {
	this._description = new_description
}
get description():string {
	return this._description
}

private _price:number = 0;
@Input() set price(new_price:number) {
	this._price = new_price
}
get price():number {
	return this._price
}

onCardClick(){
  this.onCardClicked.emit();
}

onDeleteClick(event:any){
  this.onDeleteClicked.emit();
  event.stopPropagation();
}

  constructor(private router:Router) { }

  ngOnInit() {}

}
