import './App.css';
import { Route } from 'react-router-dom';
import { Detail, DogCreate, Home, LandingPage } from './Views/index';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  return (
      <div className="App">
        <Route> 
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/home'> 
            <Home /> 
          </Route>
          <Route path='/dogs'>
            <DogCreate />
          </Route> 
          <Route path='/home/:id'>
            <Detail/>
          </Route> 
        </Route>
      </div>  
  );
};
export default App;