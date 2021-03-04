//will show gifs from giphy after input request
//and change to table maybe later
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button'

function SearchList() {
  /// useSelector() to assign local var to store
  //const newVariable = useSelector(store)
  //newVariable.map


  return(
    <>
      <p>Search List</p>
      <ul>
        <li>
          <img src="https://giphy.com/static/img/zoomies.gif" alt="Smiley Face" />
          <Button
            variant="contained"
            color="secondary">
          Favorite</Button>
        </li>
      </ul>
    </>
  )


}

export default SearchList;
