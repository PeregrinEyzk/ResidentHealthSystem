import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawService {
  public static data: string='SDFY';
  public getValue(){
    return DrawService.data;
  }
  public setValue(key){
    DrawService.data=key;
  }
  constructor() { }
}
