import React, {useState, useEffect} from 'react'
import { List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";


const searchBar = ({ setResults }) => {
  const [linksstored] = useState('');

  const handleLinkChange = event => {
    setName( event.target.value );
  }


  async function handleSubmit(event) {
    event.preventDefault();
  
    setResults(linksstored);
  }

 return (
    <div id="search">
      <h3>Search...</h3>
      <form onSubmit={ handleSubmit }>
        <input
          type="text" 
          placeholder="links"
          value={ linksstored }
          onInput={ handleLinkChange } />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default searchBar;