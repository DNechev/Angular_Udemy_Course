import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header.component';
import { DropdownDirective } from './shared/Directives/dropdown.directive';
import { ShoppingListService } from './shopping-list/shoppingList.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import { AuthComponent } from './Auth/auth.component';
import { LoadingSpinnerComponent } from './Shared/LoadingSpinner/loading-spinner.component';
import { AuthInterceptorService } from './Auth/auth.interceptor.service';
import { AlertComponent } from './Shared/alert/alert.component';
import { PlaceholderDirective } from './Shared/placeholder/placeholder.directive';
import { RecipesModule } from './recipes/recipes.module';
import { RouterModule } from '@angular/router';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule
  ],
  providers: [ShoppingListService, RecipeService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [
    AlertComponent
  ]
})
export class AppModule {
}
