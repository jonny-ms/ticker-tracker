import * as React from 'react'
import { SearchBar } from './SearchBar';
import { Results } from './Results';
// import axios from 'axios';
import { autoComplete } from '../../db/mockApi'

export function LiveSearch(props) {
  const [search, setSearch] = React.useState({
    term: "",
    results: [],
    loading: false
  })
  

  const prev = React.useRef("");

  React.useEffect(() => {
    if (prev.current === "" && search.term === "") return;

    setSearch(prev => ({
      ...prev,
      loading: true
    }));

    prev.current = search.term;

    //!Commented out axios call
    // axios({
    //   method: 'get',
    //   url: `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/auto-complete?lang=en&region=US&query=${search.term}`,
    //   responseType: 'stream',
    //   headers: {
    //     'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    //     'x-rapidapi-key': process.env.REACT_APP_YAHOO_FINANCE_API_KEY
    //   }
    // })
    // .then(({data}) => {

    //   console.log(data.ResultSet.Result)

    //   setSearch(search => ({
    //     ...search,
    //     results: data.ResultSet.Result,
    //     loading: false
    //   }));
    // })
    // .catch(error => {
    //   console.log(error)
    //   // showError();
    // });

    //!Mock fetch

    const awaitFunc = () => {
      return new Promise(() => {
        setTimeout(() => {
          setSearch(search => ({
            ...search,
            results: autoComplete,
            loading: false
          }));
        }, 2000)
      })
    }
      
    async function asyncCall() {
      await awaitFunc()
    }
    asyncCall()

}, [search.term]);

  return(
    <div>
    <SearchBar 
      onSearch={term => setSearch({...search, term})} 
      loading={search.loading}
    />
    <Results results={search.results} />
  </div>
  )

}