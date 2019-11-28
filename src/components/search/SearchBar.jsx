import * as React from 'react';
import useDebounce from '../../hooks/useDebounce';
import { Loading } from '../Loading'

export function SearchBar(props) {
  const [value, setValue] = React.useState("")

  useDebounce(() => props.onSearch(value), 1000)
  
  return (
    <div className='search-bar'>
      <form onSubmit={e => e.preventDefault()}>
        <input 
          value={value}
          onChange={event => setValue(event.target.value)}
          placeholder='Search name or symbol'
          alt='Search stocks by name or symbol'
          type='text'
          />
      </form>
      <Loading show={props.loading} />
    </div>
  );
}
