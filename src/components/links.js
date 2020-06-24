import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

//NOTE: LinksArray Props not used! Remove!
const Links = ({ linksArray, results }) => {
  // const [links, setLinks] = useState([]);

  // useEffect(() => {
  //   axios.get("/api/links").then((resp) => {
  //     console.log(
  //       "Entered Components links. Returning links:",
  //       resp.data.links
  //     );

  //     // return setLinks(resp.data.links);

  //   });
  // }, []);


  // useEffect(() => {
  //   if(!results||results.length<1){
  //     console.log('Im in the links useEffect No Results', results.length);
  //   axios.get("/api/links").then((resp) => {
  //     console.log(
  //       "Entered Components links. Returning links:",
  //       resp.data.links
  //     );

  //     return setLinks(resp.data.links);
  //   });
  // }
  // }, [results]);


  // console.log("Links from setLinks is:", links);

  return (
    <div>
      <p>Here are your links:</p>
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

export default Links;
