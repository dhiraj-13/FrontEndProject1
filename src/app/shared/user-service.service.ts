import { Injectable,EventEmitter } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { user } from '../model/use.model';



const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  value: any;
  constructor()
  {
  }

  setImageBase64(base64){
    this.value = base64;
  }

  getImageBase64(){
   return this.value;
  }


  statusUpdated = new EventEmitter<string>();



   }

