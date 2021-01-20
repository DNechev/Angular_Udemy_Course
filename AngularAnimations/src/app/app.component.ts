import { animate, state, style, transition, trigger } from '@angular/animations';
import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0)'
      })),
      state('highLighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal => highLighted', animate(300)),
      transition('highLighted => normal', animate(300))
    ])
  ]
})
export class AppComponent {
  state = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

    onAdd(item) {
      this.list.push(item);
    }

    onAnimate(){
      this.state == 'normal' ? this.state = 'highLighted' : this.state = 'normal';
    }
}
