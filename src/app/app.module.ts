import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRouting } from "./app.routing";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { SecureComponent } from './pages/secure/secure.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { DataMoviesService } from "./services/data-movies/data-movies.service";
import { AddMovieComponent } from './popups/add-movie/add-movie.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';

import { JsonPipe, APP_BASE_HREF } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MaterialModule } from "./material.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SecureComponent,
    AddMovieComponent,
    MovieCardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRouting
  ],
  providers: [
    DataMoviesService,
    JsonPipe,
    {provide: APP_BASE_HREF, useValue: ""}
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    AddMovieComponent
  ]
})
export class AppModule { }
