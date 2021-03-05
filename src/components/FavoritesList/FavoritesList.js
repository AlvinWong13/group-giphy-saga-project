  import { useDispatch, useSelector } from 'react-redux';
  import { Grid } from '@material-ui/core';
  import FavoritesItem from '../FavoriteItem/FavoriteItem';
  import { useEffect } from 'react';
  
  function FavoritesList() {
    const dispatch = useDispatch();
    // useSelector to get reducer in index.js
    const favoritesList = useSelector((state) => state.GifsFavs);
  
    useEffect(() => {
      dispatch({ 
        type: 'GET_FAVORITES' 
      });
      dispatch({
        type: 'GET_CATEGORY'
      });
    }, []);
  
    return (
      <Grid container spacing={4} justify="center">
        {favoritesList.map(favorite => {
          return (
            <Grid item key={favorite.id}>
              <FavoritesItem favorite={favorite} />
            </Grid>
          );
        })}
      </Grid>
    );
  }
  
  export default FavoritesList;