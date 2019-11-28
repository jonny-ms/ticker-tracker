import * as React from 'react'
import * as V from 'victory'
import { intraOneDay } from '../../db/mockApi'

export function Chart() {
  
  const [intraDay, setIntraDay] = React.useState([])
  const [domain, setDomain] = React.useState([])
  const [min, setMin] = React.useState()
  const [max, setMax] = React.useState()
  
  React.useEffect(() => {

    let parsedData = []
    // let range = []
    let minimum = 0
    let maximum = 0
    
    for (let data in intraOneDay) {
      // if (range.length === 0) {
        // range.push(intraOneDay[data].close, intraOneDay[data].close)
      // }
      if (minimum === 0) {
        minimum = intraOneDay[data].close
        maximum = intraOneDay[data].close
      }
      // range = [Math.min(range[0], intraOneDay[data].close), Math.max(range[1], intraOneDay[data].close)]
      minimum = Math.min(minimum, intraOneDay[data].close)
      maximum = Math.max(maximum, intraOneDay[data].close)
      parsedData.push({x:data, y:Number(intraOneDay[data].close)})
    }

    // setDomain(range)
    setMin(minimum)
    setMax(maximum)
    setIntraDay(parsedData)
    
  }, [])


  
  return(
    <>
      {intraDay[0] &&
      <V.VictoryArea 
        theme={V.VictoryTheme.material}
        data={intraDay}
        interpolation={"linear"}
        domain={{x:0, y:[min, max]}}
        style={{
          data: {
            fill: "#98c5c7"
          }}}
        containerComponent={
          <V.VictoryVoronoiContainer
            labels={({ datum }) => datum.x}
          />
        }
        animate={{
          duration: 1000,
          // onLoad: { duration: 1000 }
        }}
        />
        }
    </>
  )
}