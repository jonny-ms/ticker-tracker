import * as React from 'react'

export function ResultItem(props) {

  return(
      <div onClick={() => props.getQuote(props.result.symbol)}>
        <p>{props.result.symbol}</p>
        <p>{props.result.name}</p>
        <p>{props.result.type}</p>
        <p>{props.result.exchDisp}</p>
        <p>{props.result.typeDisp}</p>
      </div>
  )
}