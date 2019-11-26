import * as React from 'react'

export function ResultItem(props) {

  return(
      <>
        <p>{props.result.symbol}</p>
        <p>{props.result.name}</p>
        <p>{props.result.type}</p>
        <p>{props.result.exchDisp}</p>
        <p>{props.result.typeDisp}</p>
      </>
  )
}