import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form') form;
  defaultSubscriptionType = 'Advanced';
  userData = {
    email: '',
    subscriptionType: ''
  }

  onSubmit() {
    console.log(this.form.value);
    this.userData.email = this.form.value.email;
    this.userData.subscriptionType = this.form.value.subscription;
    this.form.reset();
  }
}
