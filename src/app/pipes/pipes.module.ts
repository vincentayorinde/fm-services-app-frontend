import { NgModule } from '@angular/core';
import { SearchFilterPipe } from './search-filter.pipe';
// import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SearchFilterPipe],
  exports: [SearchFilterPipe],
  imports: [
    // CommonModule
  ]
})
export class PipesModule { }
