import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EvenOrOddGame';
  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  onGameRunningEvent(gameNumber: number){
    if (gameNumber % 2 === 0){
      this.evenNumbers.push(gameNumber);
    }
    else{
      this.oddNumbers.push(gameNumber);
    }
  }
}
