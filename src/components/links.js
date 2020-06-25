import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

//NOTE: LinksArray Props not used! Remove!
const Links = ({ linksArray, results }) => {

  const handleClick = (event) => {
    // event.preventDefault();
    console.log('testing click handler');
    const id = event.target.id;
    console.log("here's your key, maybe? ", id);

  }


  return (
    <div>
      <p>Here are your links:</p>
    <List onClick={handleClick}>
      {results.map(({ id, url, clicks, comments }) => {
          const urlString = `http://${url}`;
        return (
          <List.Item key={id}
              id={id}>
            <List.Icon name="marker" />
            <List.Content>
              <List.Header><a href = {urlString} target='_blank'>
              {url}
              </a></List.Header>
              <List.Description>{comments}</List.Description>
            </List.Content>
          </List.Item>
        );
      })}
    </List>
    </div>
  );
};

export default Links;
