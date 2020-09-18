import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  @Input() movieDetails: Movie;
  @Output() removeMovie = new EventEmitter<Movie>();
  
  constructor() { }

  ngOnInit() {
  }

  // deleteMovie() {
  //   console.log("delete");
  //   this.removeMovie.emit(this.movieDetails);
  // }

}
