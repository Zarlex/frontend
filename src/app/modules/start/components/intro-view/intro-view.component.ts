import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'intro-view',
  styles: [require('./intro-view.style.scss')],
  template: require('./intro-view.template.html')
})

export class IntroViewComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }
}
