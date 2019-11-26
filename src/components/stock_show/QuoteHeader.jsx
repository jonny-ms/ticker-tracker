import * as React from 'react'

export function QuoteHeader(props) {

  return(
    <>
        <p>{props.quote.symbol}</p>
        <p>{props.quote.name}</p>
        <p>{props.quote.price} {props.quote.currency}</p>
        <p>{props.quote.day_change} {props.quote.change_pct}</p>
    </>
  )

}
