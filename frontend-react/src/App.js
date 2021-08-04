import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, Route, Switch } from 'react-router-dom';
import MovieList from './components/MovieList';
import AddMovie from './components/AddMovie';
import Movie from './components/Movie';


function App() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to={"/movies"}>Peliculas</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/add"}>Agregar</Link>
                </li>
              </ul>              
            </div>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/","/movies"]} component={MovieList}></Route>

            <Route exact path={"/add"} component={AddMovie}></Route>

            <Route exact path={"/movies/:id"} component={Movie}></Route>

          </Switch>
        </div>         
     </div>

  );
}

export default App;
