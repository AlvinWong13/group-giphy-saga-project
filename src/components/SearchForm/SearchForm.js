import SearchList from '../SearchList/SearchList';

function SearchForm() {
  //calling to GET the Giphys from
  const getGiphy = () => {
    dispatch({
      type: 'SET_GIFS',
    });
  };
  return (
    <>
      <p>Search Form</p>
      <input type="text" />
      <button onClick={getGiphy}> </button>
      <SearchList />
    </>
  );
}

export default SearchForm;
