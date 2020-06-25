import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { SearchResult } from "semantic-ui-react"; //This is redundant
import { LinkList, SearchBar, SearchResults, LinksCard, SearchCreate, CreateElementModal } from "./components";

const App = () => {

  const [results, setResults] = useState([]);
  const [params, setParams] = useState('');
  const [showModal, setShowModal] = useState(false);

  return (
    <Router>
      <div>
        <nav>
          <SearchBar
            setResults={setResults}
            setParams= { setParams }
            />
        </nav>
        <br/>
          <LinkList
            results={results}
            setResults={setResults}/>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
