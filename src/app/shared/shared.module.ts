import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponentComponent } from './components/card-component/card-component.component';
import { HttpClientModule } from '@angular/common/http';
//import { UserDetailComponent } from './components/user-detail/user-detail.component';



@NgModule({
  declarations: [
    //Directifes
     
    //Pipes
    
    //Components
    CardComponentComponent
    /*UserDetailComponent*/],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  exports:[
    CommonModule, 
    IonicModule, 
    FormsModule,
    //Directifes
     
    //Pipes
    
    //Components
    CardComponentComponent
    /*UserDetailComponent*/
  ]
})
export class SharedModule { }