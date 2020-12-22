import { Component, OnInit } from '@angular/core';
import { AccountService } from './account.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoggingService]
})
export class AppComponent implements OnInit{
  constructor(private accountService: AccountService){}

  accounts: {name: string, status: string}[] = [];

  ngOnInit(){
    this.accounts = this.accountService.accounts;
  }

  onAccountAdded(newAccount: {name: string, status: string}) {
    this.accountService.addAccount(newAccount.name, newAccount.status);
  }

  onStatusChanged(updateInfo: {id: number, newStatus: string}) {
    this.accountService.updateStatus(updateInfo.id, updateInfo.newStatus);
  }
}
