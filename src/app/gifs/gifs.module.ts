import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GallerypageComponent } from './gallerypage/gallerypage.component';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';



@NgModule({
  declarations: [
    GallerypageComponent,
    SearchComponent,
    ResultsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GallerypageComponent
  ]
})
export class GifsModule { }
