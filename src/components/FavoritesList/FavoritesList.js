function FavoritesList() {
  return(
    <>
    <h2>Favorites</h2>
      <ul>
        <li>
          <img src="https://giphy.com/static/img/zoomies.gif" alt="Smiley Face" />
          <img src="https://media.giphy.com/media/HPvfnOuz1tOgg/giphy.gif" alt="Nick Cage" />
          <select name="categories">
            <option>Funny</option>
            <option>Cohort</option>
            <option>Cartoon</option>
            <option>NSFW</option>
            <option>Meme</option>
          </select>
        </li>

      </ul>
    </>
  )
}

export default FavoritesList;