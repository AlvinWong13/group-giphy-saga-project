import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function FavoritesList() {
  const dispatch = useDispatch();

  // categories
  const [newCategory, setNewCategory] = useState(0)

  // get data from store for list
  const favoriteList = useSelector(store => store.Reducer);
  // get data from store for categories
  const categories = useSelector(store => store.categoryReducer);

  useEffect(() => {
    dispatch({
      type: 'GET_FAVORITES'
    });
    dispatch({
      type: 'GET_CATEGORY'
    });
  }, []);

  const changeCategory = (id) => {
    // send category to saga then to DB
    const newFavorite = {
        category_id: Number(newCategory),
        favorite_id: Number(id)
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

          {/* favorite.map */}
          <select 
            name="categories" 
            onChange={(event) => setNewCategory(event.target.value)}
          >
            {categories.map(category => {
              <option value={category.id}>{category.name}</option>
            })}
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