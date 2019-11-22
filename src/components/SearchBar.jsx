import * as React from 'react';
import useDebounce from '../hooks/useDebounce';
import Loading from './Loading'

export function SearchBar(props) {
  const [value, setValue] = React.useState("")

  React.useEffect(() => {
    console.log(value)

  }, [value])
  useDebounce(() => props.onSearch(value), 1000)
  
  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        <input value={value} onChange={event => setValue(event.target.value)}/>
        <Loading show={props.loading} />
      </form>
    </div>
  );
}
