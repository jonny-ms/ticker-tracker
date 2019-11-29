import * as React from 'react'
import * as V from 'victory'
import moment from 'moment'

export function Chart(props) {
  
  const [chartData, setChartData] = React.useState([])
  const [yDomain, setYDomain] = React.useState([])
  
  React.useEffect(() => {

    console.log('in chart', props.data)
    
    let parsedData = []
    let yRange = []
    
    for (let i in props.data) {
      if (yRange.length === 0) {
        yRange.push(props.data[i].close, props.data[i].close)
      }
      yRange = [Math.min(yRange[0], props.data[i].close), Math.max(yRange[1], props.data[i].close)]
      parsedData.unshift({x:i, y:Number(props.data[i].close)})
    }

    setYDomain(yRange)
    setChartData(parsedData)
    
  }, [props.data])


  // const Container = V.createContainer("voronoi", "cursor")
  
  return(
    <>
      {chartData[0] &&
      <V.VictoryGroup
      containerComponent={
        <V.VictoryVoronoiContainer
        labels={({ datum }) => moment(datum.x, 'YYYY-MM-DD HH:mm:ss').format('lll')}

        />
        // <Container
          // labels={({ datum }) => moment(datum.x, 'YYYY-MM-DD HH:mm:ss').format('lll')}
          // voronoiDimension="x"
          // cursorDimension="x"
  
          // />
        }
      >
      <V.VictoryArea 
        theme={V.VictoryTheme.material}
        data={chartData}
        interpolation={"linear"}
        domain={{x:0, y:yDomain}}
        style={{
          data: {
            fill: "#98c5c7", stroke: "#77dab2",strokeWidth: 2
          }}}
        animate={{
          duration: 1000,
          // onLoad: { duration: 1000 }
        }}
   
        />
      </ V.VictoryGroup>
      }
    </>
  )
}