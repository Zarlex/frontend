import {Directive, HostListener, Output, EventEmitter} from '@angular/core';
import {debounce} from 'underscore';

@Directive({
  selector: '[scrollNavigator]'
})
export class ScrollNavigatorDirective {
  private sleepTimer = 100;
  private _overScrollX: number = 0;
  private _overScrollY: number = 0;
  private touchLastX: number = 0;
  private touchLastY: number = 0;
  private isSleeping = false;

  private set overScrollX(x: number) {
    this._overScrollX = x;
    if(x>0){
      console.log('X', x);
    } else {
      //this.scrollTopProgress = x*-1;
    }
  }

  private get overScrollX(): number {
    return this._overScrollX
  }

  private set overScrollY(y: number) {
    if(y>0){
      this.scrollBottomProgress.emit(y);
    } else if(y<0){
      this.scrollTopProgress.emit(y*-1);
    } else {
      this.scrollBottomProgress.emit(0);
      this.scrollTopProgress.emit(0);
    }
    this._overScrollY = y;
  }

  private get overScrollY(): number {
    return this._overScrollY;
  }

  constructor() {
  }

  private hasScrolledToBottom = function () {
    return ((window.innerHeight + window.scrollY) >= document.body.scrollHeight)
  };

  private hasScrolledToTop = function () {
    return window.scrollY < 1;
  };

  private hasScrolledToRight = function () {
    return ((window.innerWidth + window.scrollX) >= document.body.scrollWidth)
  };

  private hasScrolledToLeft = function () {
    return window.scrollX < 1;
  };

  private wakeUpTimer = debounce(() => {
    this.isSleeping = false;
  }, this.sleepTimer);

  private debouncedIncrementListener = debounce((deltaX: number, deltaY: number, ev: Event) => {
    if (this.hasScrolledToBottom() || this.hasScrolledToTop()) {
      if (this.overScrollY > -100 && this.overScrollY < 100) {
        this.overScrollY += deltaY;
      } else {
        this.isSleeping = true;
        if (this.overScrollY > 0) {
          this.executeScrollBottomFn();
        } else {
          this.executeScrollTopFn();
        }
        this.overScrollY = 0;
        this.touchLastY = 0;
        this.wakeUpTimer();
      }
    }

    if (this.hasScrolledToLeft() || this.hasScrolledToRight()) {
      if (this.overScrollX > -100 && this.overScrollX < 100) {
        this.overScrollX += deltaX;
      } else {
        this.isSleeping = true;
        if (this.overScrollX > 0) {
          this.executeScrollRightFn();
        } else {
          this.executeScrollLeftFn();
        }
        this.overScrollX = 0;
        this.touchLastX = 0;
        this.wakeUpTimer();
      }
    }
  }, 5);

  private debouncedResetListener = debounce(() => {
    this.overScrollX = 0;
    this.overScrollY = 0;
    this.touchLastX = 0;
    this.touchLastY = 0;
  }, 200);

  @Output()
  public scrollBottomProgress: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public scrollTopProgress: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public scrollLeftProgress: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public scrollRightProgress: EventEmitter<number> = new EventEmitter<number>();

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(ev: TouchEvent) {
    if (!this.isSleeping) {
      let deltaX = this.touchLastX ? (ev.touches[0].clientX - this.touchLastX) : 0;
      let deltaY = this.touchLastY ? (ev.touches[0].clientY - this.touchLastY) : 0;
      this.touchLastX = ev.touches[0].clientX;
      this.touchLastY = ev.touches[0].clientY;
      this.debouncedIncrementListener(deltaX * -1, deltaY * -1, ev);
      this.debouncedResetListener();
    } else {
      this.wakeUpTimer();
    }

    // if(this.hasScrolledToBottom() || this.hasScrolledToTop()){
    //   ev.preventDefault();
    // }
    // ev.stopImmediatePropagation();
    // ev.stopPropagation();
  }

  @HostListener('window:mousewheel', ['$event'])
  onMouseWheel(ev: MouseWheelEvent) {
    if (!this.isSleeping) {
      this.debouncedIncrementListener(ev.deltaX, ev.deltaY, ev);
      this.debouncedResetListener();
    } else {
      this.wakeUpTimer();
    }
  }

  executeScrollRightFn() {
    console.log('OPEN Prev >')
  }

  executeScrollLeftFn() {
    console.log('OPEN NEXT <')
  }

  executeScrollTopFn() {
    console.log('OPEN Prev ^')
  }

  executeScrollBottomFn() {
    console.log('OPEN NEXT v')
  }

}
