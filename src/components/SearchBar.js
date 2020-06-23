import React, {useState, useEffect} from 'react'
import { List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";


const searchBar = ({ setResults, setParams }) => {
  const [linksstored] = useState('');
  const [url, setUrl] = useState('');


  const handleLinkChange = event => {
    event.preventDefault();
    setUrl( event.target.value );
    setParams(event.target.value);

    let resultsArray=[];

    axios.get(`/api/SearchResults/${url}`)
      .then(res=>{
        console.log('Search Bar Search Results: ', res.data.data);

        const results = res.data.data;
        if(results){
          return setResults(results);
  
        }
       
      })
  }


  async function handleSubmit(event) {
    event.preventDefault();
  
    setResults(linksstored);
  }

 return (
    <div id="search">
      <h3>Search...</h3>
      <form >
        <input
          type="text" 
          placeholder="links"
          // value={ linksstored }
          onInput={ handleLinkChange } />
        {/* <button type="submit">Search</button> */}
      </form>
    </div>
  );
}

export default searchBar;