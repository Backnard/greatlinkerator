import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { SearchResult } from "semantic-ui-react"; //This is redundant
import { LinkList, SearchBar, SearchResults, Links, SearchCreate, CreateElementModal } from "./components";

const App = () => {

  const [results, setResults] = useState([]);

  return (
    <Router>
      <div>
        <nav>
          {/* < SearchCreate 
              setResults = {setResults}
              setShowModal={ setShowModal }/> */}
          <SearchBar
            results={results}
            setResults={setResults}
            />
          <LinkList
            results={results}
            setResults={setResults}/>
        </nav>
        <br/>
        <Links results={results}/>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
