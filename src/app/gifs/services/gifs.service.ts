import { Gif, SearchGifsResponse } from './../interface/gifs.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private historySearch: string[] = [];
  private apiKey: string = '8rt89WSnD25ZNWqIRYRHolnK5FLqz2qf';
  public results: Gif[] = [];

  constructor(private http: HttpClient) {
    //Si es nulo, que me devuelva un array vacio: []. Tambien podria ponerse con condicionales
    this.historySearch = JSON.parse(localStorage.getItem('history')!) || []; //Signo de obligacion: le estoy indicando a angular que confie, que nunca devolvera nada nulo

    this.results = JSON.parse(localStorage.getItem('gifs')!) || [];

  }

  get history() {
    return this.historySearch;
  }

  searchImages(term: string) {
    term = term.trim().toLowerCase();

    if (!this.historySearch.includes(term)) {
      this.historySearch.unshift(term);
      this.historySearch = this.historySearch.splice(0, 10);

      /*Almaceno los strings de busqueda en el Local Storage para que, 
       *al cerrar el navegador o refrescar la página, estos strings de 
       *busqueda no se borren y permanezcan en el historial
       */
      localStorage.setItem('history', JSON.stringify(this.historySearch));

      /*Ahora necesitamos, una vez refresquemos o cerremos navegador, 
       *coger los valores del Local Storage y pasarlos a al historial 
       *de la columna de la izquierda. Nos dirigimos al constructor del servicio.
       */

    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=8rt89WSnD25ZNWqIRYRHolnK5FLqz2qf&q=${term}&limit=10`).subscribe(resp => {
      console.log(resp.data);
      this.results = resp.data;

      localStorage.setItem('gifs', JSON.stringify(this.results));
    });
  }



  // async searchImages(term: string) {

  //   term = term.trim().toLowerCase();

  //   if (!this.historySearch.includes(term)) {
  //     this.historySearch.unshift(term);
  //     this.historySearch = this.historySearch.splice(0, 10);
  //   }

  //   const resp = await fetch('api.giphy.com/v1/gifs/search?api_key=8rt89WSnD25ZNWqIRYRHolnK5FLqz2qf&q=dragon ball&limit=10');
  //   const data = await resp.json();
  //   console.log(data);
  // }
}

