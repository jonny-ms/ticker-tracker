import * as React from 'react'

export function ResultItem(props) {

  return(
      <div>
        <div className='search-results-item' >
          <p>{props.result.symbol}</p>
          <p>{props.result.exchDisp}</p>
        </div>
        <div className='search-results-item' >
          <p>{props.result.name}</p>
        </div>
      </div>
  )
}