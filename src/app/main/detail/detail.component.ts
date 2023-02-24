import { Component,OnInit,Input } from '@angular/core';
import { fakeMovies } from '../../fake-movies';
import { Movie } from 'src/app/model/movie';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MovieService } from 'src/app/movie.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/message.service';
@Component({
  selector: 'angular-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  movie: Movie |null|undefined;
  movies = fakeMovies;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    
    private location: Location,
    // private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getMovie();
  }
  getMovie(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.route.snapshot.paramMap)}`);
    // //Call service to "get movie from id" ?
    // this.messageService.add(`HeroService: fetched hero id=${this.route.snapshot.paramMap.get('id')}`)
    this.movieService.getMovie(id).subscribe(movie => this.movie = movie);  
            
  }
  goBack(): void {
    this.location.back();
  }


}