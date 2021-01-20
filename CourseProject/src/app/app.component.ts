import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';
import { LoggingService } from './logging.service';
import * as AuthActions from './Auth/store/auth.actions';
import * as fromApp from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>, private logService: LoggingService, @Inject(PLATFORM_ID) private platfromId) {}

  ngOnInit(): void {
    if(isPlatformBrowser(this.platfromId)){
      this.store.dispatch(new AuthActions.AutoLogin(null));
    }
    this.logService.printLog('Hello from AppComponent!');
  }
}
