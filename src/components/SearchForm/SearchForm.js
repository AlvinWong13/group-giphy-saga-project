import SearchList from '../SearchList/SearchList'
import { useDispatch, useSelector } from 'react-redux';

function SearchForm() {
  const dispatch = useDispatch();
  const searchGif = () => {
    console.log("button clicked")
    // dispatch({
    //   type:
    // })
  }

  return(
    <>
      <p>Search Form</p>
      <input 
        type="text"
      />
      <button onClick={searchGif}>Submit</button>
      <SearchList />
    </>
  )

//comment
}


export default SearchForm;