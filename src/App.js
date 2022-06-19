import './App.css';
import searchIcon from './search.svg';
import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';


// https://gist.github.com/adrianhajdin/997a8cdf94234e889fa47be89a4759f1?short_path=65f6eb8

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=e86fbc52';
const App = () => {
  // // useState 
  // const [ counter , setCounter] = useState(0);
  // // useEffect
  // useEffect(()=>{
  //   alert(`you've got the value: ` + counter);
  //   // setCounter(101); -> shouldn't use like this bcz it creates infinite loop
  // },[counter]);

  // Movie Search Project
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState('');
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const res = await response.json();
    console.log(res.Search);
    setMovies(res.Search);
  }

  useEffect(() => {
    searchMovies('namaste');
  }, []);



  return (
    // React fragments(<> ... </>) can be used to wrap our code inside return
    // We can write any js code inside {}
    <>
      {/*
        <button onClick={()=>setCounter(prevCount=> prevCount + 1)}>+</button>
        <p>{counter}</p>
        <button onClick={()=>setCounter(prevCount=> prevCount - 1)}>-</button> */}

      <div className='app'>
        <h1>MovieWiki</h1>
        <div className='search'>
          <input placeholder='Enter a name'
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                searchMovies(searchText)
              }
            }}
          />
          <img src={searchIcon}
            alt="search"
            onClick={() => searchMovies(searchText)}
          />
        </div>
        {
          movies?.length > 0 ? (
            <div className='container'>
              {movies.map(movie => <MovieCard movie={movie} key={movie?.imdbID}/>)}
            </div>
          ) : (
            <div className='empty'>
              <h2>No Movies Found</h2>
            </div>
          )
        }
      </div>
    </>
  );

  // This is not a HTML page..This syntax is know as JSX(Javascript Syntax Extension)
}

export default App;

// Virtual DOM is a light weight representation of Real DOM which is just a key value pair.
// It helps to render the only effected part of DOM which is way faster than Real DOM

// React State in react is a plain JS object which represents a piece of information about the component's current situation
// React state is completely managed by the component itself.

//useState-> It's a react hook. whenever you see a method is called in react starting with 'use' then it will be a hook.
// https://omdbapi.com/apikey.aspx


// you can use any name in place of props
