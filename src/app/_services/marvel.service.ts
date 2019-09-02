import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';


import { Observable,  BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  private marvelResult:BehaviorSubject<any> = new BehaviorSubject([]);
  public marvelResult$:Observable<any>;  

  constructor(private http:HttpClient) {
    this.marvelResult$ = this.marvelResult.asObservable();
   }

   public getMarvelList(value:string){

    this.marvelResult.next(null);
     
     this.http.get(`https://itunes.apple.com/search?term=${value}&entity=musicTrack`).subscribe((result:any)=>{
       this.marvelResult.next(result.results);
     })
   }

   public  getDetail(collectionId:string){

    return this.http.get(`https://itunes.apple.com/lookup?id=${collectionId}`);

   }


}
