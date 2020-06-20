import react, {useState, useEffect} from 'react'
import { List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";


const searchResults =()=>{
    const[results, setResults] = useState([]);

    
    return (
        <div id="search">
          <h3>Look up cards here...</h3>
          <form onSubmit={ handleSubmit }>
            <input
              type="text" 
              placeholder="card name"
              value={ name }
              onChange={ handleNameChange } />
            <input
              type="text"
              placeholder="card text"
              value={ text }
              onChange={ handleTextChange } />
            <button type="submit">Search</button>
          </form>
        </div>
      );
    }  


