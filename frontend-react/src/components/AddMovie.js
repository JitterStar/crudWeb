import {useState} from 'react';
import MovieService from '../services/MovieService';

const AddMovie = () =>{
    const initialMovieState={
        id: null,
        title: '',
        cover: '',
        synopsis: '',
        year: 0,
    };
    const[movie,setMovie]=useState(initialMovieState);
    const[submitted, setSubmitted] = useState(false);

    const handleInputChange = event =>{
        const {name, value}= event.target;
        setMovie({ ...movie, [name]: value});
    }

    const saveMovie = () =>{
        let data ={
            title: movie.title,
            cover: movie.cover,
            synopsis: movie.synopsis,
            year: movie.year,
        }
        MovieService.create(data)
        .then(response => {
            setMovie({
                id: response.data.id,
                title: response.data.title,
                cover: response.data.cover,
                synopsis: response.data.synopsis,
                year: response.data.year,
            });
            setSubmitted(true);
            console.log(movie);
        }).catch(err => {
            alert('Ocurrio un error');
            console.log(err);
        });    
    }

    const newMovie = () =>{
        setMovie(initialMovieState);
        setSubmitted(false);
    }

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Has Creado tu peli</h4>
                    <button className="btn btn-primary" onClick={newMovie}>Crear Otra</button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label>Titulo</label>
                        <input type="text" className="form-control" id="title" required 
                        value={movie.title} onChange={handleInputChange} name="title" />
                    </div>

                    <div className="form-group">
                        <label>Portada</label>
                        <input type="text" className="form-control" id="cover" required 
                        value={movie.cover} onChange={handleInputChange} name="cover" />
                    </div>

                    <div className="form-group">
                        <label>Synopsis</label>
                        <input type="text" className="form-control" id="synopsis" required 
                        value={movie.synopsis} onChange={handleInputChange} name="synopsis" />
                    </div>

                    <div className="form-group">
                        <label>Titulo</label>
                        <input type="text" className="form-control" id="year" required 
                        value={movie.year} onChange={handleInputChange} name="year" />
                    </div>
                    <br />
                    <button onClick={saveMovie} className="btn btn-success">Guardar Peli</button>
                </div>                
            )}
        </div>
    )
};

export default AddMovie;