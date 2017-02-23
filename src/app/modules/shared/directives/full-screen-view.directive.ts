import {Directive, ElementRef, OnInit, HostListener, AfterContentInit, Input} from '@angular/core';
import {debounce} from 'underscore';

@Directive({
  selector: '[full-screen-view]'
})
export class FullScreenViewDirective implements OnInit {

  constructor(private el: ElementRef) {

  }

  @Input()
  public setMinHeight: boolean = false;

  @Input()
  public setMinWidth: boolean = false;

  private setSize(): void {
    let winHeight = window.innerHeight;
    let winWidth = window.innerWidth;

    if(this.setMinWidth){
      this.el.nativeElement.style.minWidth = `${winWidth}px`;
    } else {
      this.el.nativeElement.style.width = `${winWidth}px`;
    }

    if(this.setMinHeight){
      this.el.nativeElement.style.minHeight = `${winHeight}px`;
    } else {
      this.el.nativeElement.style.height = `${winHeight}px`;
    }

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
