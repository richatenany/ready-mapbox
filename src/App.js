import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/fontawesome-free-solid'
import {useState} from 'react'
import Dropdown from '../src/components/homepage/Dropdown'
import Home from '../src/components/homepage/home'
import { Router, Switch, Route, useLocation } from "react-router-dom";
import history from './history';
import { propTypes } from 'react-map-gl-geocoder';
import { render } from '@testing-library/react';


function App() {
  const [showBack, setShowBack] = useState(false)
  const [options, setOptions] = useState([])


  const showBackArrow = () => {
    if(showBack) {
      return(
        <header className="header1" > <FontAwesomeIcon icon={faChevronLeft} className="icon" onClick={() => history.push('/')}/> </header>
      )
    }
    else {
      <header className="header" > </header>
    }
  }
  return (  
    <Router history={history}>
      <header className="header" > {showBackArrow()} </header>
      <Switch>
          <Route exact path="/" > <Dropdown setOptions={setOptions} setShowBack={setShowBack} /> </Route>
          <Route path="/checking" > <Home options={options} showBack={showBack} setShowBack={setShowBack} /> </Route>
      </Switch>
    </Router>
  );
}

export default App;
