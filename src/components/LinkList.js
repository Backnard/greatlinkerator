import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { render } from "react-dom";

const linkList = ({
  results,
  setResults,
  searchTerm
}) => {

  useEffect(() => {
    axios.get("/api/links").then((resp) => {
      console.log(
        "Entered Components LinkList. Returning links:",
        resp.data.links
      );
      
      return setResults(resp.data.links);
    });
  }, [!searchTerm.length]);

  function sortByUrl(event) {
    event.preventDefault();
    let newArray = [...results];

    newArray.sort(function (a, b) {
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

    console.log('results sorted by url: ', newArray);
    setResults(newArray);
  };

  function sortById(event) {
    event.preventDefault();
    let newArray = [...results];

    newArray.sort(function (a, b) {
      return a.id - b.id;
    });

    console.log('results sorted by ID: ', newArray);
    setResults(newArray);
  };

  function sortByComments(event) {
    event.preventDefault();
    let newArray = [...results];

    newArray.sort(function (a, b) {
      const x = a.comments.toLowerCase();
      const y = b.comments.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });

    console.log('results sorted by comments: ', newArray);
    setResults(newArray);
  };

  function sortByClicks(event) {
    event.preventDefault();
    let newArray = [...results];

    newArray.sort(function (a, b) {
      return a.clicks - b.clicks;
    });

    console.log('results sorted by clicks: ', newArray);
    setResults(newArray);
  };

  return (
    <div>
      <button onClick={sortByUrl}>Sort by url</button>
      <button onClick={sortById}>Sort by ID</button>
      <button onClick={sortByComments}>Sort by Comments</button>
      <button onClick={sortByClicks}>Sort by Clicks</button>
    </div>
  );
};

export default linkList;
