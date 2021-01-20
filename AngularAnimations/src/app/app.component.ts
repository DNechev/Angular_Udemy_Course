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
      transition('normal <=> highLighted', animate(300)),
      // transition('highLighted => normal', animate(800))
    ]),
    trigger('wildState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('highLighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunkState', style({
        backgroundColor: 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition('normal => highLighted', animate(300)),
      transition('normal => highLighted', animate(800)),
      transition('shrunkState <=> *',[
        style({
          backgroundColor: 'orange'
        }),
        animate(1000, style({
          borderRadius: '50px'
        })),
        animate(500)
      ])
    ]),
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(+100px)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class AppComponent {
  state = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];
  wildState = 'normal';

    onAdd(item) {
      this.list.push(item);
    }

    onAnimate(){
      this.state == 'normal' ? this.state = 'highLighted' : this.state = 'normal';
      this.wildState == 'normal' ? this.wildState = 'highLighted' : this.wildState = 'normal';
    }

    onShrink(){
      this.wildState = 'shrunkState';
    }

    onDelete(item){
      this.list.splice(this.list.indexOf(item), 1);
    }
}
