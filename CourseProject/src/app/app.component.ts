import { Component, OnInit } from '@angular/core';
import { AuthService } from './Auth/auth.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private logService: LoggingService) {}

  ngOnInit(): void {
    this.authService.autoLogIn();
    this.logService.printLog('Hello from AppComponent!');
  }
}
