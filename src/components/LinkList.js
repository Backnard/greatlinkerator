import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { render } from "react-dom";

const linkList = ({
  results,
  setResults
}) => {

  useEffect(() => {
    axios.get("/api/links").then((resp) => {
      console.log(
        "Entered Components LinkList. Returning links:",
        resp.data.links
      );
      
      return setResults(resp.data.links);
    });
  }, []);

  function sortNumerically(data) {
    let resultsToSort = data;
    resultsToSort.sort(function (a, b) {
      return a.id - b.id;
    });

    console.log('results sorted numerically: ', resultsToSort);
    return resultsToSort;
  };

  function sortAlphabetically(data) {
    let resultsToSort = data;
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

    console.log('results sorted alphabetically: ', resultsToSort);
    return resultsToSort;
  };

  function handleAlphabeticalClick(event) {
    event.preventDefault();
    let data = sortAlphabetically(results);
    setResults(data);
  }

  function handleNumericalClick(event) {
    event.preventDefault();
    let data = sortNumerically(results);
    setResults(data);
  }

  function createList(resultsToMap) {
    return resultsToMap.map(({url, clicks, comments }) => {
      return (
        <List.Item key={url}>
          <List.Icon name="marker" />
          <List.Content>
            <List.Header as="a">{url}</List.Header>
            <List.Description>{comments}</List.Description>
          </List.Content>
        </List.Item>
      );
    })
  }

  return (
    <div>
      <button onClick={handleAlphabeticalClick}>Sort by url</button>
      <button onClick={handleNumericalClick}>Sort by click</button>
      <List>{createList(results)}</List>
    </div>
  );
};

export default linkList;
