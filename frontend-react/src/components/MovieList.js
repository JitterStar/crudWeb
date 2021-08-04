import { useState, useEffect } from "react";
import MovieService from '../services/MovieService';
import {Link} from 'react-router-dom';

const MovieList = () =>{
    const [movies, setMovies]= useState([]);
    const [currentMovie, setCurrentMovie]= useState(null);
    const [currentIndex, setCurrentIndex]= useState(-1);

    useEffect(() =>{
        retrieveMovies();
    }, []);

    const retrieveMovies = () => {
        MovieService.getAll()
        .then(res => {
            setMovies(res.data);
            console.log(movies);
        })
        .catch(err => {
            alert('Ocurrio un error');
            console.log(err);
        });
    }

    const refreshList = () => {
        retrieveMovies();
    }

    const setActiveMovie = (movie,index) =>{
        setCurrentMovie(movie);
        setCurrentIndex(index);
    }

    const deleteMovie = (id) => {
        if(!window.confirm("Realmente desea eliminar esta pelicula")){
            return;
        }
        MovieService.remove(id)
        .then(res => {
            refreshList();
        })
        .catch(err => {
            alert('Ocurrio un error al Eliminar');
            console.log(err);
        });    
    }
    return (
        <div className="row">
            <div className="col-8">
                <h4>Peliculas</h4>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Año</th>
                        <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies &&
                        movies.map((movie, index)=>(
                            <tr key={index}>
                                <td>{movie.id}</td>
                                <td>{movie.title}</td>
                                <td>{movie.year}</td>

                                <td>
                                    <a className="btn btn-primary btn-sm" onClick={() => setActiveMovie(movie,index)}>
                                        <i className="bi bi-folder-fill">
                                        </i>
                                        View
                                    </a>
                                    <Link className="btn btn-info btn-sm" to={'/movies/' + movie.id}>
                                        <i className="bi bi-pencil-fill">
                                        </i>
                                        Edit
                                    </Link>
                                    <a  className="btn btn-danger btn-sm" onClick={() => deleteMovie(movie.id)}>
                                        <i className="bi bi-trash-fill">
                                        </i>
                                        Delete
                                    </a>
                                </td>
                                  
                            </tr>
                        ))
                        }                        
                    </tbody>
                </table>
            </div>
            <div className="col-4">
                {(currentMovie) ? (
                    <div>
                        <h4>{currentMovie.title}</h4>
                        <div>
                            <label>
                                <strong>Año: </strong>
                                {currentMovie.year}
                            </label>
                        </div>

                        <div>
                            <label>
                                <strong>Sinopsis: </strong>
                                {currentMovie.synopsis}
                            </label>
                        </div>

                        <div>
                            <img className="img-fluid" src={currentMovie.cover} />
                        </div>
                        <Link to={'/movies/'+ currentMovie.id} className="badge badge-warning">
                            Editar
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Primero Selecciona la Pelicula</p>
                    </div>
                )}
            </div>
        </div>
    )
};

export default MovieList;