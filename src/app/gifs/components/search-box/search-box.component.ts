import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text" class="form-control" placeholder="buscar gifs ..." (keyup.enter)="imprimeTag()" #txtTagInput/>
  `,

})
export class SearchBoxComponent {

  @ViewChild("txtTagInput")
  public tagInput!: ElementRef<HTMLInputElement>

  constructor(private gifsSevice: GifsService) {

  }

  imprimeTag(): void {
    const tag = this.tagInput.nativeElement.value;
    this.gifsSevice.searchTag(tag);
    this.tagInput.nativeElement.value = '';

  }

}
