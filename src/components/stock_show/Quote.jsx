import * as React from 'react'
// import axios from 'axios';
import { quote } from '../../db/mockApi'
import { QuoteHeader } from './QuoteHeader'
import { Loading } from '../Loading'

export function Quote({ match }) {

  const [search, setSearch] = React.useState({
    term: match.params.ticker,
    result: {},
    loading: false
  })


  React.useEffect(() => {

    setSearch(prev => ({
      ...prev,
      loading: true
    }));
    
    //!Commented out axios call
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
    
    //!Mock fetch

    const awaitFunc = () => {
      return new Promise(() => {
        setTimeout(() => {
          setSearch(search => ({
            ...search,
            result: quote,
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

  console.log(search)

  return(
    <>
      <Loading show={search.loading}/>
      <QuoteHeader quote={search.result} />
    </>
  )
}