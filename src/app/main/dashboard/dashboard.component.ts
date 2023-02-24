import { Component, OnInit } from '@angular/core';
import { fakeMovies } from '../../fake-movies';
import { Movie } from 'src/app/model/movie';
import { Router ,NavigationExtras} from '@angular/router';
import { MovieService } from 'src/app/movie.service';
import { MessageService } from 'src/app/message.service';
@Component({
  selector: 'angular-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  movies: Movie[] = [];
  mainMovies: Movie[] = [];
  subMovies: Movie[] = [];
  
  constructor(private movieService: MovieService, 
    // private messageService: MessageService
    ) {

  }
  

  getMovies(): void {
    // this.movies = this.movieService.getMovies();
    this.movieService.getMovies().subscribe(movies => this.movies = movies);
    this.mainMovies.push(this.movies[0], this.movies[1]);
    // this.messageService.add('HeroService: fetched heroes');
    this.subMovies.push(...this.movies.slice(2));
  }
  ngOnInit() {
    this.getMovies();
  }
}
