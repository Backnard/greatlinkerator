import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

const searchResults = ({
  searchTerm,
  results,
  sortResultsByClick,
  sortResultsByUrl,
}) => {
  return (
    <div>
      <p>Results for search term: "{searchTerm}"</p>
      <button onClick={() => sortResultsByUrl(results)}>Sort by url</button>
      <button onClick={() => sortResultsByClick(results)}>Sort by click</button>
      <List>
        {results.map(({ id, url, clicks, comments }) => {
          return (
            <List.Item key={id}>
              <List.Icon name="marker" />
              <List.Content>
                <List.Header as="a">{url}</List.Header>
                <List.Description>{comments}</List.Description>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    </div>
  );
};

export default searchResults;
