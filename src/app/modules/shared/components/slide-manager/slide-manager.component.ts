import {Component, OnInit, EventEmitter, Output, HostListener} from '@angular/core';
import {debounce} from 'underscore';
import {ScrollNavigatorDirective} from '../../directives/scroll-navigator.directive';

@Component({
  moduleId: module.id.toString(),
  selector: 'slide-manager',
  styles: [require('./slide-manager.style.scss')],
  template: require('./slide-manager.template.html')
})

export class SlideManagerComponent implements OnInit {
  private slides: Array<any> = [];
  private displayIndex = 0;

  public test: number;
  public test2: number;

  @Output() opened = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {

  }

  addSlide(slide: any) {
    if (this.slides.length === 0) {
      slide.opened = true;
    }
    this.slides.push(slide);
  }

  hasPreviousSlide(): boolean {
    return this.displayIndex > 0;
  }

  hasNextSlide(): boolean {
    return this.displayIndex < this.slides.length - 1;
  }

  openPreviousSlide() {
    if (this.hasPreviousSlide()) {
      this.slides[this.displayIndex].opened = false;
      this.displayIndex--;
      let nextSlide = this.slides[this.displayIndex];
      nextSlide.opened = true;
      this.opened.emit({openedSlide: nextSlide});
    }
  }

  openNextSlide() {
    if (this.hasNextSlide()) {
      this.slides[this.displayIndex].opened = false;
      this.displayIndex++;
      let nextSlide = this.slides[this.displayIndex];
      nextSlide.opened = true;
      this.opened.emit({openedSlide: nextSlide});
    }
  }

  scrollBottomProgress(progressY: number){
    this.test = progressY;
    if(progressY>=100){
      this.openNextSlide();
    }
    console.log('PROGRESS', progressY)
  }

  scrollTopProgress(progressY: number){
    this.test2 = progressY;
    if(progressY>=100){
      this.openPreviousSlide();
    }
    console.log('PROGRESS', progressY)
  }
}

