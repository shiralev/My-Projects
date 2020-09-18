import { Component, OnInit, OnChanges, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { Movie } from '../../models/movie';
import { MatDialogRef } from '@angular/material';
import { DataMoviesService } from '../../services/data-movies/data-movies.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit, OnChanges {

  formGroup: FormGroup;
  newMmovie: Movie = new Movie();
  category: any[];

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddMovieComponent>,
              private dataMovies: DataMoviesService) { }

  ngOnInit(): void {
    this.category = [
      { key: "Action", value: 0 },
      { key: "Drama", value: 1 },
      { key: "Comedy", value: 2 },
      { key: "Other", value: 3 }
    ];
    this.formGroup = this.fb.group({
      name: new FormControl("", [Validators.required, this.isAlreadyExists()]),
      category: this.category[0],
      link: new FormControl("", [Validators.required, this.isImdbLink()]),
      poster: new FormControl("", [Validators.required, this.isImdbPoster()]),
    });
    this.ngOnChanges();
  }

  ngOnChanges(): void {
    this.formGroup.get("name").valueChanges.subscribe(val => {
      this.newMmovie.name = val;
    });
    this.formGroup.get("category").valueChanges.subscribe(val => {
      this.newMmovie.category = val;
    });
    this.formGroup.get("link").valueChanges.subscribe(val => {
      this.newMmovie.link = val;
    });
    this.formGroup.get("poster").valueChanges.subscribe(val => {
      this.newMmovie.poster = val;
    });
  }

  isAlreadyExists(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      let forbidden; 
      this.dataMovies.getMoviesList().forEach(movie => {
        if(movie.name == control.value) {
          forbidden = true;
        }
      });
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }

  isImdbLink(): ValidatorFn {
    let linkPattern = ".imdb.com/title";
    return (control: AbstractControl): {[key: string]: any} | null => {
      const imdbPoster = control.value.includes(linkPattern);
      return !imdbPoster ? {forbiddenLink: {value: control.value}} : null;
    };
  }

  isImdbPoster(): ValidatorFn {
    let posterPattern = "m.media-amazon.com/images/";
    return (control: AbstractControl): {[key: string]: any} | null => {
      const imdbPoster = control.value.includes(posterPattern);
      return !imdbPoster ? {forbiddenPoster: {value: control.value}} : null;
    };
  }

  hasError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  addMovie() {
    if(!this.formGroup.invalid) {
      console.log("add");
      this.dataMovies.addMovie(this.newMmovie);
      this.dialogRef.close();
    }
  }

}
