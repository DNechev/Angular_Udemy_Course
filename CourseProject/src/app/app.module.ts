import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './Shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './Auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    ShoppingListModule,
    CoreModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
