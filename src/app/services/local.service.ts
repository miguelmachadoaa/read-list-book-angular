import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setItem(key: string, value: any) {
    var  items:any  = localStorage.getItem(key);
    items = JSON.parse(items);
    if(items){
      items.push(value);
    }else{
      items = [];
      items.push(value);
    }
    localStorage.setItem(key, JSON.stringify(items));
  }

  removeItem(key: string, i: any) {
    var  items:any  = localStorage.getItem(key);
    items = JSON.parse(items);
    if(items){
      items.splice(i,1);
    }else{
      items = [];
    }
    localStorage.setItem(key, JSON.stringify(items));
  }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}