import { GifsService } from './../services/gifs.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild('txtSearch') txtSearch: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  searching() { //searching(term: string){}
    console.log(this.txtSearch);
    //console.log(term);

    /*Para poder hacer referencia al input que tenemos en el html y 
     *así poder resetearlo, es decir, dejarlo en blanco una vez 
     *realicemos la busqueda, es necesario utilizar @ViewChild
     */
    //En js puro -> document.querySelector('input').value = '';
    const value = this.txtSearch.nativeElement.value;

    if (value.trim().length === 0) {
      return;
    }

    this.gifsService.searchImages(value);

    this.txtSearch.nativeElement.value = '';

  }

}
