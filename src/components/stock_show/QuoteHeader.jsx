import * as React from 'react'

export function QuoteHeader(props) {

  return(
    <>
        <p>{props.quote.symbol}</p>
        <p>{props.quote.name}</p>
        {props.quote.price &&
        <span>{props.p} </span>
        }
        <span>{props.quote.currency}</span>
        <p>{props.quote.day_change} ({props.quote.change_pct}%)</p>
    </>
  )

}
