import {Component, OnInit, ElementRef, AfterContentInit} from '@angular/core';
import {SlideManagerComponent} from '../slide-manager/slide-manager.component';

@Component({
  selector: 'slide',
  styles: [require('./slide.style.scss')],
  template: require('./slide.template.html')
})

export class SlideComponent implements OnInit {
  private opened: boolean = false;
  private height: number = 0;
  private width: number = 0;

  constructor(private slidesManagerComponent: SlideManagerComponent, private el: ElementRef) {
  }

  ngOnInit(): void {
    this.slidesManagerComponent.addSlide(this);
  }

  private getSlideEl() {
    return this.el.nativeElement.querySelector('.slide');
  }

  private getSlideWidth() {
    let slideEl = this.getSlideEl();
    if (slideEl) {
      return slideEl.offsetWidth;
    }
  }

  private getSlideHeight() {
    let slideEl = this.getSlideEl();
    if (slideEl) {
      return slideEl.offsetHeight;
    }
  }

  public getWidth() {
    return this.getSlideWidth() || this.width;
  }

  public getHeight() {
    return this.getSlideHeight() || this.height;
  }

  public open() {
    this.opened = true;
  }

  public close() {
    this.height = this.getSlideHeight();
    this.width = this.getSlideWidth();
    this.opened = false;
  }
}
