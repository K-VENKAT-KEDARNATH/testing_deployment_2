import logo from './logo.svg';
import './App.css';
import Front_page from './components/front-page/front-page';
import ListOfMovies from './components/movies/list_of_movies';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Front_page}/>
        {/* <Route exact path="/movies" component={} */}
        <Route exact path="/movies" component={ListOfMovies}/>
      </Router>
    </div>
  );
}

export default App;
