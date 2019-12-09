import * as React from 'react'
import * as V from 'victory'
import moment from 'moment'

export function Chart(props) {
  
  const [chartData, setChartData] = React.useState([])
  const [yDomain, setYDomain] = React.useState([])
  const [temp, setTemp] = React.useState({
    activated: false,
    y: null
  })
  
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


  const Container = V.createContainer("voronoi", "cursor")

  
  function handleActivation(point) {
    console.log(point)
    setTemp({
      activated: true,
      y: point[0].y
    })
  }
  
  return(
    <>
      {temp.y && <p>{temp.y}</p>}
      {chartData[0] &&
      <V.VictoryGroup
      containerComponent={
        // <V.VictoryVoronoiContainer
        // labels={({ datum }) => moment(datum.x, 'YYYY-MM-DD HH:mm:ss').format('lll')}
        // 
        // />
        <Container
            labels={({ datum }) => moment(datum.x, 'YYYY-MM-DD HH:mm:ss').format('lll')}
            labelComponent={
              <Cursor />
              // <V.VictoryLabel verticalAnchor="end" textAnchor="middle" constrainToVisibleArea />
            }
            voronoiDimension="x"
            cursorDimension="x"
            onActivated={(points, props) => console.log(points[0].y)}
            // onDeactivated={(points) => console.log("deactive", points, props)}

            // onCursorChange={(value, props) => {
              // if (props.activePoints && props.activePoints[0].y !== temp.y) {
                // 
                // handleActivation(props.activePoints[0].y)
              // }
            // }}            
          />
        }
      >
      <V.VictoryArea 
        // name="chart"
        standalone={false}
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
        // events={[{
        //   target:"data",
        //   eventHandlers:{
        //     onMouseOver:() => {
        //       return[{
        //         // childName:"chart",
        //         target:"data",
        //         mutation: (props) => {
        //           console.log(props)
        //         }
        //       }]
        //     },
        //     // onMouseOut: () => {
        //     //   return [{
        //     //     childName: "chart",
        //     //     mutation: () => {
        //     //       return null;
        //     //     }
        //     //   }];
        //     // }
        //   }
        // }]}
        />
      </ V.VictoryGroup>
      }
    </>
  )
}


class Cursor extends React.Component {
  render() {
    const { x, scale } = this.props;
    const range = scale.y.range();
    return (
      <line
        style={{
          stroke: "black",
          strokeWidth: 1
        }}
        x1={x}
        x2={x}
        y1={Math.max(...range)}
        y2={Math.min(...range)}
      />
    );
  }
}