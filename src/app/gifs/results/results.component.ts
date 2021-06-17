import { GifsService } from './../services/gifs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  constructor(private gifsService: GifsService) { }

  get results() {
    return this.gifsService.results;
  }

  ngOnInit(): void {
  }

}
