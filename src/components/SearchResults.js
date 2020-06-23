import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

const searchResults = ({
  results,
  sortResultsByClick,
  sortResultsByUrl,
  setResults, 
  params
}) => {

useEffect(()=>{
  axios.get('/api/links')
    .then(res=>{
      console.log('Initial results: ', res.data.data);
      return setResults(res.data.links);
    })
}, []);

// useEffect(()=>{
//   console.log('Entered SearchResults NoRESULTS: ',params.length);
//   if(!params|| params.length<1){
//     console.log('I guess results is undefined?');
//     axios.get('/api/links')
//     .then(res=>{
//       return setResults(res.data.links);
//     })
//   }
// }, [results]);

  return (
    <div>
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
