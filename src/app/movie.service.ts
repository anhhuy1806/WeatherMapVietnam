import { Injectable } from '@angular/core';
import { fakeMovies } from './fake-movies';
import { Movie } from './model/movie';

import { Observable } from 'rxjs';
import { of } from 'rxjs';



//MessageService
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  
  getMovies(): Observable<Movie[]> {
    const movie = of(fakeMovies);
    // this.messageService.add('HeroService: fetched heroes');
    return movie;
  }
  getMovie(id: number) : Observable<Movie| null | undefined>{
    const movie = fakeMovies.find(h => h.id ===id)!;
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(movie);
  
  }
  constructor() { }

}