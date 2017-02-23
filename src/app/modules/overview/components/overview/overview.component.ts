import {Component, OnInit, ElementRef} from '@angular/core';

@Component({
  selector: 'overview',
  styles: [ require('./overview.style.scss') ],
  template: require('./overview.template.html')
})

export class OverviewComponent implements OnInit {
  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {

  }

  open(ev: Event, num: number){
    let currentEl: HTMLElement = <HTMLElement>ev.currentTarget;
    let nextEl: HTMLElement = this.el.nativeElement.querySelector('.item-'+(num+1));
    let previousEl: HTMLElement = this.el.nativeElement.querySelector('.item-'+(num-1));
    let allELs: Array<HTMLElement> = this.el.nativeElement.querySelectorAll('.item')
    currentEl.style.flexBasis = '100%';

    if(nextEl){
      nextEl.style.flexBasis = '2%';
    }

    if(previousEl){
      previousEl.style.flexBasis = '2%';
    }

    allELs.forEach((el: HTMLElement)=>{
      if(el !== nextEl && el !== previousEl && el !== currentEl){
        el.style.flexBasis = '0%';
      }
    });

  }
}
