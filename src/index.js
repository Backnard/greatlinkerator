import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { SearchResult } from "semantic-ui-react"; //This is redundant
import { LinksList, SearchBar, SearchResults, LinksCard, SearchCreate } from "./components";

const App = () => {

  const [results, setResults] = useState([]);
  const [params, setParams] = useState('');

  const sortResultsByClick = (resultsToSort) => {
    resultsToSort.sort(function (a, b) {
      return a.clicks - b.clicks;
    });

    setResults(results);
  };

  const sortResultsByUrl = (resultsToSort) => {
    resultsToSort.sort(function (a, b) {
      const x = a.url.toLowerCase();
      const y = b.url.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });

    return setResults(results);
  };

  return (
    <Router>
      <div>
        <nav>
          < SearchCreate 
              setResults = {setResults}
              setParams = {setParams}/>
        </nav>
        <br/>
        <LinksCard
          setResults = {setResults} 
          results = {results}
          params = {params}/>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
