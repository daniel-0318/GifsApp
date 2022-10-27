import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

const KEYGIPHY = environment.apyKeyGiphy;
const URLGIPHY = environment.URLSearchGiphy;

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  constructor(private http: HttpClient) { 

    if(localStorage.getItem('historial')){
      this._historial = JSON.parse( localStorage.getItem('historial')! );
      this.resultados = JSON.parse( localStorage.getItem('resultados')! );
    }

  }

  get historial(){
    return [...this._historial];
  }

  buscarGifs(query: string){

    query = query.trim().toLowerCase();
    
    if(!this._historial.includes(query)){
      
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    console.log(this._historial);
    
    this.http.get<SearchGifsResponse>(`${URLGIPHY}?api_key=${KEYGIPHY}&q=${query}&limit=10`)
    .subscribe((resp) => {
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
      
    });
    
  }

}
