import * as React from 'react'

import { ResultItem } from './ResultItem'
import { Link } from 'react-router-dom'


export function Results(props) {
  
  return(
    <div>
      {props.results[0] &&
        <h6>Stocks</h6>
      }
      {props.results[0] &&
        props.results.map((result, i) => {
          return(
            <Link to={`/stock/${result.symbol}`} style={{ textDecoration: 'none' }}>
              <ResultItem result={result} key={i} />
            </Link>
        )
        })
      }
    </div>
  )
  
}
