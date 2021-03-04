import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function FavoritesList() {
  const dispatch = useDispatch();

  // categories
  const [newCategory, setNewCategory] = useState('')

  // get data from store for list
  const favoriteList = useSelector(store => store.Reducer);
  // get data from store for categories

  useEffect(() => {
    dispatch({
      type: 'GET_FAVORITES'
    });
  }, []);

  const changeCategory = (id) => {
    // send category to saga then to DB
    const newFavorite = {

    }
    dispatch({
      type: 'CHANGE_CATEGORY',
      payload: newFavorite
    })

  }

  return(
    <>
    <h2>Favorites</h2>
      <ul>
        <li>
          <img src="https://giphy.com/static/img/zoomies.gif" alt="Smiley Face" />
          <img src="https://media.giphy.com/media/HPvfnOuz1tOgg/giphy.gif" alt="Nick Cage" />
          <select 
            name="categories" 
            onChange={(event) => setNewCategory(event.target.value)}
          >
            <option>Funny</option>
            <option>Cohort</option>
            <option>Cartoon</option>
            <option>NSFW</option>
            <option>Meme</option>
          </select>
          <div>
            <button onClick={() => {changeCategory(favorite.id)}}>Change Category</button>
          </div>
        </li>
      </ul>
    </>
  )
}

export default FavoritesList;