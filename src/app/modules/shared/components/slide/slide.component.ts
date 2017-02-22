import {Component, OnInit} from '@angular/core';
import {SlideManagerComponent} from '../slide-manager/slide-manager.component';

@Component({
  selector: 'slide',
  styles: [ require('./slide.style.scss') ],
  template: require('./slide.template.html')
})

export class SlideComponent implements OnInit {
  public opened = false;

  constructor(private slidesManagerComponent: SlideManagerComponent) {
  }

  ngOnInit(): void {
    this.slidesManagerComponent.addSlide(this);
  }
}
