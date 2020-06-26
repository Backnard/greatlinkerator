import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { SearchResult } from "semantic-ui-react"; //This is redundant
import { LinkList, SearchBar, SearchResults, Links, SearchCreate, CreateElementModal, LinksTable, addNewLink ,AddNewLink } from "./components";

const App = () => {


  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <div>
        <nav>
          <SearchBar
            results={results}
            setResults={setResults}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            />
          <AddNewLink></AddNewLink>
          <LinkList
            results={results}
            setResults={setResults}
            searchTerm={searchTerm}/>
        </nav>
        <br/>
        <LinksTable 
            results={results}
            setResults={setResults}/>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
