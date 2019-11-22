import * as React from 'react'

import { ResultItem } from './ResultItem'

export function Results(props) {
  
  return(
    <div>
      {props.results[0] &&
      props.results.map((result, i) => {
        return <ResultItem result={result} getQuote={props.getQuote} key={i} />
      })}
    </div>
  )
  
}
