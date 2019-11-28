import * as React from 'react'
import axios from 'axios';
import { quote } from '../../db/mockApi'
import { QuoteHeader } from './QuoteHeader'
import { Loading } from '../Loading'
import { Chart } from './Chart'


export function Quote({ match }) {

  const [search, setSearch] = React.useState({
    term: match.params.ticker,
    realTimeQuote: {},
    loading: false
  })


  React.useEffect(() => {

    setSearch(prev => ({
      ...prev,
      loading: true
    }));
    
    //!Commented out axios call
    //*Real time quote with summary
    // axios({
      // method: 'get',
      // url: `https://api.worldtradingdata.com/api/v1/stock?symbol=${search.term}&api_token=${process.env.REACT_APP_WORLD_TRADING_API_KEY}`,
    // })
    // .then(({data}) => {
    // 
      // console.log(data.data[0])
    // })
    // .catch(error => {
    //   console.log(error)
    // });
    //*Historical Data
      // axios({
      //   method: 'get',
      //   url: `https://api.worldtradingdata.com/api/v1/history?symbol=${search.term}&api_token=${process.env.REACT_APP_WORLD_TRADING_API_KEY}`,
      // })
      // .then(({data}) => {
      
      //   console.log(data.history)
      // })
    //*1D Intraday Data
      // axios({
      //   method: 'get',
      //   url: `https://intraday.worldtradingdata.com/api/v1/intraday?symbol=${search.term}&range=1&interval=5&api_token=${process.env.REACT_APP_WORLD_TRADING_API_KEY}`,
      // })
      // .then(({data}) => {
      
      //   console.log(data)
      // })

    
    //!Mock fetch

    const awaitFunc = () => {
      return new Promise(() => {
        setTimeout(() => {
          setSearch(search => ({
            ...search,
            realTimeQuote: quote,
            loading: false
          }));
        }, 2000)
      })
    }
      
    async function asyncCall() {
      await awaitFunc()
    }
    asyncCall()
    
  }, [search.term])

  return(
    <>
      <Loading show={search.loading}/>
      {search.realTimeQuote.name &&
        <>
          <QuoteHeader quote={search.realTimeQuote} />
          <Chart data={search.historicalData} />
        </>
      }
    </>
  )
}