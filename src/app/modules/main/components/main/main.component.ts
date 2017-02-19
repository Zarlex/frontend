import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'zero-day-one',
  styles: [require('./main.style.scss')],
  template: require('./main.template.html'),
  encapsulation: ViewEncapsulation.None,
})

export class MainComponent implements OnInit {
  constructor() {

  }

  ngOnInit(): void {

  }
}
