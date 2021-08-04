import { Component, OnInit } from '@angular/core';
import { Movie } from '../Models/Movie';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public movies$: Promise<Movie[]> | undefined;
  constructor(
    private moviesService: MoviesService
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  deleteMovie=(id: number | undefined)=>{
    if(confirm('Deseas eliminar')){
      this.moviesService.deleteMovieById(id).then(res =>{
        alert('Eliminado con exito');
      }).catch(err => {
        console.log(err);
      }).finally(() => this.getMovies())
    }
  }

  getMovies =()=>{
    this.movies$= this.moviesService.getAllMovies();
    console.log(this.movies$);
  }

}
