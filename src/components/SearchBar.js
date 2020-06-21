import React, {useState, useEffect} from 'react'
import { List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";


const searchBar =()=>{
    // const[results, setResults] = useState([]);
    // axios.get("/api/SearchResults/google")
    // .then(resp=>{
    //  console.log("Search Results from:", resp) 
    //  return setResults(resp)
    // })

    return( 
    <div>
    <p>Search Bar Here:</p>
    </div>)
    // return (
    //     <div id="search">
    //       <h3>Look up cards here...</h3>
    //       <form onSubmit={ handleSubmit }>
    //         <input
    //           type="text" 
    //           placeholder="card name"
    //           value={ name }
    //           onChange={ handleNameChange } />
    //         <input
    //           type="text"
    //           placeholder="card text"
    //           value={ text }
    //           onChange={ handleTextChange } />
    //         <button type="submit">Search</button>
    //       </form>
    //     </div>
    //   );
    }  


export default searchBar;