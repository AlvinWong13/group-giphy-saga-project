import SearchList from '../SearchList/SearchList'
import { useDispatch, useSelector } from 'react-redux';
import {useState} from 'react';
function SearchForm() {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();
  const searchGif = () => {
    console.log("input value", inputValue)
    dispatch({
      type: 'SEARCH_GIFS',
      payload:{
        search: inputValue
      }
    })
  }

  return(
    <>
      <p>Search Form</p>
      <input 
        type="text"
        onChange={(event)=> setInputValue(event.target.value)}
        value={inputValue}
      />
      <button onClick={searchGif}>Submit</button>
      <SearchList />
    </>
  )

//comment
}


export default SearchForm;