import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../Auth/auth.service';
import { DataStorageService } from '../Shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../Auth/store/auth.actions'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
    collapsed = true;
    private userSub: Subscription;
    isAuthenticated = false;

    constructor(private dataStorageService: DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>) {
    }

    ngOnInit() {
      this.userSub = this.store.select('auth').pipe(map(storeData => storeData.user)).subscribe(user => {
        this.isAuthenticated = !user ? false : true;
      });
    }

    onLogout(): void {
      this.store.dispatch(new AuthActions.Logout(null));
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
