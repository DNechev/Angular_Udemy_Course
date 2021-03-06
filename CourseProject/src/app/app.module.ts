import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './Shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './Auth/store/auth.effects';
import * as fromAppReducer from './store/app.reducer'
import { environment } from 'src/environments/environment';
import { RecipeEffects } from './recipes/store/recipe.effects';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    StoreModule.forRoot(fromAppReducer.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    StoreRouterConnectingModule.forRoot()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
