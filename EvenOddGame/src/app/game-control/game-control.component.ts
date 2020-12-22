import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output('gameRunningEvent') gameRunning = new EventEmitter<number>();

  counter = 0;
  intervalId;
  constructor() { }

  ngOnInit(): void {
  }

  startGame(){
    this.intervalId = setInterval(() => {
      this.counter++;
      this.gameRunning.emit(this.counter);
      console.log(this.counter);
    }, 1000);
  }

  endGame(){
    if (this.intervalId != null){
      clearInterval(this.intervalId);
    }
    console.log(this.counter);
  }

  isCounterZero(): boolean{
    if (this.counter === 0){
      return true;
    }
    else{
      return false;
    }
  }
}
