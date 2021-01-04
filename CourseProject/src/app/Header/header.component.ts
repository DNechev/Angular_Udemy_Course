import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../Auth/auth.service';
import { DataStorageService } from '../Shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
    collapsed = true;
    private userSub: Subscription;
    isAuthenticated = false;

    constructor(private dataStorageService: DataStorageService, private authService: AuthService) {
    }

    ngOnInit() {
      this.userSub = this.authService.userSubject.subscribe(user => {
        this.isAuthenticated = !user ? false : true;
      });
    }

    ngOnDestroy(): void {
      this.userSub.unsubscribe();
    }

    onSaveData(): void {
      this.dataStorageService.storeRecipes();
    }

    onFetchData(): void {
      this.dataStorageService.fetchRecipes().subscribe();
    }
}
