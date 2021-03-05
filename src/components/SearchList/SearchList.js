//will show gifs from giphy after input request
//and change to table maybe later
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button'

function SearchList() {
  const dispatch = useDispatch();
  /// useSelector() to assign local var to store
  //const newVariable = useSelector(store)
  //newVariable.map
  const gifsSearch = useSelector(store => store.gifsSearch);

  const handleFavorite = (url) => {
    dispatch({
      type: 'ADD_FAVORITE',
      payload: { url }
    });
  }

  return(
    <>
      <p>Search List</p>
      <ul>
        {gifsSearch.map(gif => {
          console.log('gif object:', gif);
          return (
            <li key={gif.id}>
              <img src={gif.images.original.url} />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleFavorite(gif.images.original.url)}
              >
                Favorite
              </Button>
            </li>
          );
        })}
      
      </ul>
    </>
  )


}

export default SearchList;
