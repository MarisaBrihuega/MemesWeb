import { Gif, SearchGifsResponse } from './../interface/gifs.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private historySearch: string[] = [];
  private apiKey: string = '8rt89WSnD25ZNWqIRYRHolnK5FLqz2qf';
  public results: Gif[] = [];
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

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

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', term);
    //console.log(params.toString());

    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, { params }).subscribe(resp => {
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

