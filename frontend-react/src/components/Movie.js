import {useEffect, useState} from 'react';
import MovieService from '../services/MovieService';

const Movie = (props) =>{
    const initialMovieState={
        id: null,
        title: '',
        cover: '',
        synopsis: '',
        year: null,
    };
 
    const [currentMovie, setCurrentMovie] = useState(initialMovieState);
    const [message, setMessage] = useState('');

    const getMovie= (id) => {
        MovieService.getById(id)
        .then(res => {
          setCurrentMovie(res.data);
        })
        .catch(err => {
            alert('Ocurrio un error');
            console.log(err);
        });  
    }

    useEffect(() => {
        getMovie(props.match.params.id)
    },[props.match.params.id]);

    const handleInputChange = event =>{
        const {name, value}= event.target;
        setCurrentMovie({ ...currentMovie, [name]: value});
    }

    const updateMovie = () =>{
        
        MovieService.update(currentMovie.id,currentMovie)
        .then(response => {
            setMessage('La pelicula se actualizo');
        }).catch(err => {
            alert('Ocurrio un error');
            console.log(err);
        });    
    }

    const deleteMovie = () => {
        if(!window.confirm("Realmente desea eliminar esta pelicula")){
            return;
        }
        MovieService.remove(currentMovie.id)
        .then(res => {
            props.history.push('/movies');
        })
        .catch(err => {
            alert('Ocurrio un error al Eliminar');
            console.log(err);
        });    
    }

    return (
        <div className="submit-form">
            {!currentMovie ? (
                <div>
                    <h4>Selecciona una pelicula</h4>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label>Titulo</label>
                        <input type="text" className="form-control" id="title" required 
                        defaultValue={currentMovie.title} onChange={handleInputChange} name="title" />
                    </div>

                    <div className="form-group">
                        <label>Portada</label>
                        <input type="text" className="form-control" id="cover" required 
                        defaultValue={currentMovie.cover} onChange={handleInputChange} name="cover" />
                    </div>

                    <div className="form-group">
                        <label>Synopsis</label>
                        <input type="text" className="form-control" id="synopsis" required 
                        defaultValue={currentMovie.synopsis} onChange={handleInputChange} name="synopsis" />
                    </div>

                    <div className="form-group">
                        <label>Año</label>
                        <input type="number" className="form-control" id="year" required 
                        defaultValue={currentMovie.year} onChange={handleInputChange} name="year" />
                    </div>
                    <br />
                    <button onClick={updateMovie} className="btn btn-success">Guardar Cambios</button>
                    <button onClick={deleteMovie} className="btn btn-danger">Eliminar Pelicula</button>
                    <div>
                        <p>{message}</p>
                    </div>
                </div>                
            )}
        </div>
    )
};

export default Movie;