import { Component, Input } from '@angular/core';
import { AccountService } from '../account.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private loggingService: LoggingService, private accService: AccountService){}

  onSetTo(status: string) {
    this.accService.updateStatus(this.id, status);
    this.accService.statusUpdated.emit(status);
    // this.loggingService.logStatusChange(status);
  }
}
