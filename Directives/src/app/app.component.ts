import { Time } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DirectivesExercise';
  displayDetails = false;
  clicks: number = 1;
  numberOfClicks: number[] = [];

  toggleDetails(){
    this.displayDetails = !this.displayDetails;
    this.numberOfClicks.push(this.clicks);
    this.clicks++;
  }
}
