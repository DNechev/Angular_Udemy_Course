import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.subscription = interval(1000).subscribe( count =>
    //   {
    //     console.log(count);
    //   });
    const customInterval = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        count++;
      }, 1000);
    });

    this.subscription = customInterval.subscribe(count => {
      console.log(count);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
