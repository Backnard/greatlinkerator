import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { SearchResult } from "semantic-ui-react";
import { LinksList, SearchBar, SearchResults } from "./components";

const App = () => {
  const searchTerm = "t";
  const [results, setResults] = useState([]);

  //placeholder until searchBar is complete
  useEffect(() => {
    axios.get(`/api/SearchResults/${searchTerm}`).then((resp) => {
      return setResults(resp.data.data);
    });
  }, []);
  console.log("result from setResults: ", results);
  //   sortResultsByUrl(results);
  //   console.log("sorted results from setResults: ", results);

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
          <SearchBar />
        </nav>
        <h1>Hello Patrick!</h1>
        <br />
        <LinksList />
        <br />
        <SearchResults
          searchTerm={searchTerm}
          results={results}
          sortResultsByClick={sortResultsByClick}
          sortResultsByUrl={sortResultsByUrl}
        />
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
