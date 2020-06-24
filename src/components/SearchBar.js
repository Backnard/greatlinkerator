import React, {useState, useEffect} from 'react'
import { List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";


const searchBar = ({ results, setResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  function searchMatches(result, compare) {
    console.log('searchMatches, results: ', results, 'compare: ', compare);
    const { id, url, comments } = result;
    const newId = id.toString();
    const filterOn = [newId, url, comments];
  
    return filterOn.some((string) => {
      return string.toLowerCase().includes(compare);
    });
  }

  const handleLinkChange = event => {
    event.preventDefault();
    setSearchTerm( event.target.value)

    console.log('SearchBar results: ', results);
      let filteredResults = results.filter((result) =>
      searchMatches(result, searchTerm)
    );
    console.log("your filtered search results: ", filteredResults);
    setResults(filteredResults);
  }

 return (
    <div id="search">
      <h3>Search...</h3>
      <form >
        <input
          type="text" 
          placeholder="links"
          // value={ linksstored }
          onChange={ handleLinkChange } />
        {/* <button type="submit">Search</button> */}
      </form>
    </div>
  );
}

export default searchBar;