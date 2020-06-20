import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

const LinksList = ({ linksArray }) => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    axios.get("/api/links").then((resp) => {
      console.log(
        "Entered Components links. Returning links:",
        resp.data.links
      );

      return setLinks(resp.data.links);
    });
  }, []);
  console.log("Links from setLinks is:", links);

  const testArray = ["brian", "patrick", "Sean"];
  return (
    <List>
      {links.map(({ id, url, clicks, comments }) => {
        return (
          <List.Item key={id}>
            <List.Icon name="marker" />
            <List.Content>
        <List.Header as="a">{url}</List.Header>
              <List.Description>
                {comments}
              </List.Description>
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
};

export default LinksList;
