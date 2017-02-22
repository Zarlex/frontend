import {Directive, ElementRef, OnInit, HostListener, AfterContentInit} from '@angular/core';
import {debounce} from 'underscore';

@Directive({
  selector: '[full-screen-view]'
})
export class FullScreenViewDirective implements OnInit {

  constructor(private el: ElementRef) {

  }

  private setSize(): void {
    let winHeight = window.innerHeight;
    let elHeight = this.el.nativeElement.offsetHeight;
    let height = elHeight > winHeight ? elHeight : winHeight;
    this.el.nativeElement.style.width = `${window.innerWidth}px`;
    this.el.nativeElement.style.height = `${height}px`;
  }

  private debouncedSetSize: any = debounce(this.setSize, 100);

  @HostListener('window:resize', ['$event'])
  private onResize(): void {
    this.debouncedSetSize();
  }

  ngOnInit(): void {
    this.setSize();
  }
}
