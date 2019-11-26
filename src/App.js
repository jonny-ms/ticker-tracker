import * as React from 'react';
import { LiveSearch } from './components/search/LiveSearch'
import { Quote } from './components/stock_show/Quote'
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  
  return (
    <Router>
      <div className="App">
        <h1>My Stock Tracker App</h1>
        <Switch>
          <Route path='/' exact component={LiveSearch}/>
          <Route path='/stock/:ticker' component={Quote}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
