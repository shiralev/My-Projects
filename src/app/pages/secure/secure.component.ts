import { Component, ViewChild, ElementRef, OnInit, OnChanges } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie, CategoryTypes } from '../../models/movie'
import { MatDialog } from '@angular/material/dialog';
import { AddMovieComponent } from '../../popups/add-movie/add-movie.component';
import { DataMoviesService } from '../../services/data-movies/data-movies.service';
import { StateService } from  "../../services/state/state.service"; 

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})

export class SecureComponent implements OnInit, OnChanges {

  @ViewChild('drawer', { static: false })
  drawer: any;

  catgoryType: CategoryTypes = 1;
  mapCat = new Map();
  moviesToShow: Movie[] = [];
  userName: string = this.appState.userName;

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.HandsetPortrait)
    .pipe(map((result: BreakpointState) => result.matches));

  constructor(private breakpointObserver: BreakpointObserver, 
                public dialog: MatDialog, 
                private dataMovies: DataMoviesService,
                private appState: StateService) {}

  ngOnInit() {
    this.initCategories();
    this.moviesToShow = this.dataMovies.getByCat(this.catgoryType);
  }

  ngOnChanges(): void {
    this.moviesToShow = this.dataMovies.getByCat(this.catgoryType);
  }

  initCategories() {
    this.mapCat = new Map();
    this.dataMovies.getMoviesList().forEach(movie => {
      if(!this.mapCat.has(movie.category)){
        this.mapCat.set(Number(movie.category), true);
        this.catgoryType = movie.category;
      }
    });
  }

  ChangeCategory(catType: number) {
    this.catgoryType = catType;
    this.moviesToShow = this.dataMovies.getByCat(this.catgoryType);
  }

  closeSideNav() {
    if (this.drawer._mode=='over') {
      this.drawer.close();
    }
  }

  removeMovie(movie: Movie): void {
    this.dataMovies.removeMovie(movie);
    this.initCategories();
    this.moviesToShow = this.dataMovies.getByCat(this.catgoryType);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddMovieComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.initCategories();
      this.moviesToShow = this.dataMovies.getByCat(this.catgoryType);
    });
  }
}
