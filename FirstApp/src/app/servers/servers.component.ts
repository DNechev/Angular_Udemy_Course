import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer: boolean = false;
  serverCreationStatus: string = "No server was created!";
  serverName = "test server";
  serverCreated = false;
  servers = ['Test server', 'Test server 2']

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
   }

  ngOnInit(): void {

  }

  onUpdateServerName(event: Event){
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  onCreateServer() {
    this.serverCreationStatus = "Server was created! Name is " + this.serverName;
    this.serverCreated = true;
    this.servers.push(this.serverName);
  }
}
