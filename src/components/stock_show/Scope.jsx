import * as React from 'react'

export function Scope(props) {

  const [activeButton, setActiveButton] = React.useState('1D')

  React.useEffect(() => {

    switch(activeButton) {
      case '1D':
        props.onChange({name: activeButton, count: 1, unit: 'days', apiInterval: 5, apiRange: 1})
        break;
      case '1W':
        props.onChange({name: activeButton, count: 1, unit: 'weeks', apiInterval: 60, apiRange: 5})
        break;
      case '1M':
        props.onChange({name: activeButton, count: 1, unit: 'months', apiInterval: null, apiRange: null})
        break;
      case '3M':
        props.onChange({name: activeButton, count: 3, unit: 'months', apiInterval: null, apiRange: null})
        break;
      case '1Y':
        props.onChange({name: activeButton, count: 1, unit: 'years', apiInterval: null, apiRange: null})
        break;
      case '5Y':
        props.onChange({name: activeButton, count: 5, unit: 'years', apiInterval: null, apiRange: null})
        break;
      default:
        throw new ReferenceError ('Scope is not within the scope of this project...') 
    }

  }, [activeButton])
  
  return(
    <>
      <button value={'1D'} onClick={e => setActiveButton(e.target.value)}>1D</button>
      <button value={'1W'} onClick={e => setActiveButton(e.target.value)}>1W</button>
      <button value={'1M'} onClick={e => setActiveButton(e.target.value)}>1M</button>
      <button value={'3M'} onClick={e => setActiveButton(e.target.value)}>3M</button>
      <button value={'1Y'} onClick={e => setActiveButton(e.target.value)}>1Y</button>
      <button value={'5Y'} onClick={e => setActiveButton(e.target.value)}>5Y</button>
    </>
  )
}

