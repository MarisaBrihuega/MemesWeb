import { GifsService } from './../../gifs/services/gifs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private gifsSerive: GifsService) { }

  get history() {
    return this.gifsSerive.history;
  }

  ngOnInit(): void {
  }

  search(term: string) {
    console.log(term);
    this.gifsSerive.searchImages(term);
  }

}
