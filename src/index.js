import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { SearchResult } from "semantic-ui-react"; //This is redundant
import { LinkList, SearchBar, LinksTable,AddNewLink } from "./components";

const App = () => {


  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [refresh, setRefresh] = useState(false);

  return (
    <Router>
      <div>
        <nav>
          <SearchBar
            results={results}
            setResults={setResults}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            refresh={refresh}
            setRefresh={setRefresh}
            />
          <AddNewLink
            setRefresh={setRefresh}/>
          <LinkList
            results={results}
            setResults={setResults}
            searchTerm={searchTerm}
            setRefresh={setRefresh}
            refresh={refresh}/>
        </nav>
        <br/>
        <LinksTable 
            results={results}
            setResults={setResults}
            searchTerm={searchTerm}
            refresh={refresh}
            setRefresh={setRefresh}/>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
