import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Item } from '../interfaces/item';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class UserNotFoundException extends Error{
        
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  id:number=0;
  private _items:BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  public items$:Observable<Item[]> = this._items.asObservable();

  constructor(private http:HttpClient) { }

  public addItem (item:Item):Observable<Item>{

    var _items:any = {
      name: item.name,
      description: item.description,
      price: item.price
      
    }
   
    return this.http.post<Item>(environment.apiUrl+"/items",_items).pipe(tap(_=>{
      this.getAll().subscribe();
    }))

    /*return new Observable<Item>(observer=>{
      setTimeout(() => {
        var _items = [...this._items.value];
        item.id = ++this.id;
        _items.push(item);
        this._items.next(_items);
        observer.next(item);
      }, 1000);
    })*/

  }

  public query(q:string):Observable<Item[]>{
    // Si coincide el tipo de datos que recibo con mi interfaz
    return this.http.get<Item[]>(environment.apiUrl+'/items?q='+q);
  }

  public getAll():Observable<Item[]>{
      // Si coincide el tipo de datos que recibo con mi interfaz
    return this.http.get<Item[]>(environment.apiUrl+'/items').pipe(tap((items:any[])=>{
      this._items.next(items);}));
    /*return new Observable(observer =>{
      setTimeout(() => {
        var item:Item[] = [
           {id:1, name: "sfdfsfsfs", description: "sdfdgdsgdgg bb bffgtg", price:23.34},
           {id:2, name: "kgjrmemdmd", description: "sdfdsg dsgsdg dsgdsgg", price:45},
           {id:3, name: "kcnwkrkrwr", description: "dsgsdggbf rfrgrgrg", price:10},
           
        ];
        this._items.next(item);
        observer.next(item);
        observer.complete;
      }, 1000);
    });*/

  }

  public getItem(id:number):Observable<Item>{
    return this.http.get<Item>(environment.apiUrl+`/items/${id}`);
    /*return new Observable(observe =>{
      setTimeout(() => {
        var item = this._items.value.find(item=>item.id==id);
        if(item){
          observe.next(item)
        }else{
          observe.error(new UserNotFoundException);
        }
        observe.complete;

        
      }, 1000);
    });*/

  }

  public updateItem(item:Item):Observable<Item>{
    return new Observable<Item>(obs=>{
      this.http.patch<Item>(environment.apiUrl+`/items/${item.id}`,item).subscribe(_=>{
          this.getAll().subscribe(_=>{
            this.getItem(item.id).subscribe(_item=>{
              obs.next(_item);
            })
          })})});
    /*return new Observable(observe =>{
      setTimeout(() => {
        var _items = [... this._items.value];
        var index = _items.findIndex(i=>i.id == item.id)
        if(index < 0){
          observe.error(new UserNotFoundException());
        }else{
          _items[index] = item;
          observe.next(item);
          this._items.next(_items);
        }
        observe.complete
      }, 1000);
    });*/

  }

  public deleteItem(item:Item):Observable<Item>{
    return new Observable<Item>(obs=>{
      this.http.delete<Item>(environment.apiUrl+`/items/${item.id}`).subscribe(_=>{
          this.getAll().subscribe(_=>{
            obs.next(item);
          })})});
    /*return new Observable(observer =>{
      setTimeout(() =>{
        var _items = [... this._items.value];
        var index = _items.findIndex(i=>i.id == item.id );
        if(index < 0){
          observer.error(new UserNotFoundException());
        }else{
          _items = [... _items.slice(0,index), ... _items.slice(index+1)];
          this._items.next(_items);
          observer.next(item);
        }
        observer.complete;
      }, 500);
    });*/

  }

}
