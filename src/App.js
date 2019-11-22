import * as React from 'react';
import { LiveSearch } from './components/LiveSearch'
import { Quote } from './components/Quote'
import './App.css';

const QUOTE = 'QUOTE'
const SEARCH ='SEARCH'

function App() {

  const [mode, setMode] = React.useState(SEARCH);
  const [ticker, setTicker] = React.useState('')

  const getQuote = ticker => {
    setMode(QUOTE)
    setTicker(ticker)
  }
  
  return (
    <div className="App">
      {mode === SEARCH && <LiveSearch getQuote={getQuote}/>}
      {mode === QUOTE && <Quote ticker={ticker}/>}
    </div>
  );
}

export default App;
