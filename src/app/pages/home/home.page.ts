import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController, ToastOptions } from '@ionic/angular';
import { zip } from 'rxjs';
import { Item } from 'src/app/core/interfaces/item';
import { ItemService } from 'src/app/core/services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  public loading:boolean = false; 
  constructor(private router: Router,
    private toast: ToastController,
    public items: ItemService,
    private modal:ModalController) {}

    ngOnInit(): void {
      this.loading = true;
      zip(this.items.getAll()).subscribe(results => {
        this.loading = false;
      });
      
    }

  public about(){
    this.router.navigate(['/about']);
  }

  public onDeleteClicked(item:Item){
    var _item:Item = {...item};

    this.items?.deleteItem(_item).subscribe(
        {next: item=>{
        //Notificamos con un Toast que se ha pulsado
        const options:ToastOptions = {
          message:`Item deleted`, //mensaje del toast
          duration:1000, // 1 segundo
          position:'bottom', // el toast se situa en la parte inferior
          color:'danger', // color del toast
          cssClass:'fav-ion-toast' //Una clase que podemos poner en global.scss para configurar el ion-toast
        };
        //creamos el toast
        this.toast.create(options).then(toast=>toast.present());
        },
        error: err=>{
          console.log(err);
        }
      });
  }

  

}
