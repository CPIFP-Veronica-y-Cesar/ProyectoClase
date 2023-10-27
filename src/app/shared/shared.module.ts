import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { UserDetailComponent } from './components/user-detail/user-detail.component';



@NgModule({
  declarations: [
    //Directifes
     
    //Pipes
    
    //Components
    
    /*UserDetailComponent*/],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    CommonModule, 
    IonicModule, 
    FormsModule,
    //Directifes
     
    //Pipes
    
    //Components
    
    /*UserDetailComponent*/
  ]
})
export class SharedModule { }