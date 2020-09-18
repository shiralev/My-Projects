import { Injectable } from '@angular/core';
import { Movie, CategoryTypes } from '../../models/movie'
import { Observable } from 'rxjs';

declare var require: any;
let moviesList: Movie[] = require('../../data/movies.json');

@Injectable({
  providedIn: 'root'
})
export class DataMoviesService {

  private data: Movie[] = moviesList;

  getMoviesList = (): Movie[] => {
    return this.data;
  }

  addMovie = (movie: Movie): void => {
    this.data.push(movie);
  }

  removeMovie = (movie: Movie): void => {
    this.data = this.data.filter((value) => { return value.name != movie.name ;});
  }

  getByCat(category: CategoryTypes): Movie[] {
    let ans: Movie[] = [];
    this.data.forEach(element => {
      if(element.category == category) {
        ans.push(element);
      }
    });
    return ans;
  }

  constructor() { }
}
