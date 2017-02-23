import {Component, OnInit, EventEmitter, Output, HostListener} from '@angular/core';
import {animate, animate2} from '../../animate';

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
      slide.open();
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
      let currentSlide = this.slides[this.displayIndex];
      //this.slides[this.displayIndex].close();
      this.displayIndex--;
      let nextSlide = this.slides[this.displayIndex];
      nextSlide.open();
      window.requestAnimationFrame(() => {
        window.scrollTo(0, nextSlide.getHeight());
        animate2(window.scrollY, 0, (scrollTo: number) => {
          window.scrollTo(0, scrollTo);
        }, 500).then(() => {
          currentSlide.close();
          this.opened.emit({openedSlide: nextSlide});
        });
      });
    }
  }

  openNextSlide() {
    if (this.hasNextSlide()) {
      let currentSlide = this.slides[this.displayIndex];
      //this.slides[this.displayIndex].close();
      this.displayIndex++;
      let nextSlide = this.slides[this.displayIndex];
      nextSlide.open();
      window.requestAnimationFrame(()=>{
        animate2(window.scrollY, window.scrollY + window.innerHeight, (scrollTo: number) => {
          window.scrollTo(0, scrollTo);
        }, 500).then(() => {
          currentSlide.close();
          this.opened.emit({openedSlide: nextSlide});
        });
      });
    }
  }

  scrollBottomProgress(progressY: number) {
    this.test = progressY;
    if (progressY >= 100) {
      this.openNextSlide();
    }
    console.log('PROGRESS', progressY)
  }

  scrollTopProgress(progressY: number) {
    this.test2 = progressY;
    if (progressY >= 100) {
      this.openPreviousSlide();
    }
    console.log('PROGRESS', progressY)
  }
}

