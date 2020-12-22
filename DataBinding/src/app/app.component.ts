import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'DataBinding';
  userName = '';
  canResetUserName: boolean = false;

  onUserNameUpdate(){    
    if(this.userName === '')
    {
      this.canResetUserName = false;
    }
    else{
      this.canResetUserName = true;
    }
  }

  onButtonClick(){
    this.userName = '';
    this.canResetUserName = false;
  }
}
