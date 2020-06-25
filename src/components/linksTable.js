import React, { useState, useEffect } from "react";
// import { List } from "semantic-ui-react";
import { Header, Table, Rating } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

//NOTE: LinksArray Props not used! Remove!
const LinksTable = ({ linksArray, results }) => {

  const handleClick = (event) => {
    // event.preventDefault();
    console.log('testing click handler');
    const id = event.target.id;
    console.log("here's your key, maybe? ", id);

  }


  return (
    
    <Table celled padded>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell singleLine>Link URL</Table.HeaderCell>
        <Table.HeaderCell>Click Count</Table.HeaderCell>
        <Table.HeaderCell>Rating</Table.HeaderCell>
        <Table.HeaderCell>Ranking</Table.HeaderCell>
        <Table.HeaderCell>Comments</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body onClick={handleClick}>
      {results.map(({ id, url, clicks, comments }) => {
          const urlString = `http://${url}`;
        return (
            <Table.Row key={id}>
            <Table.Cell>
              <Header as='a' href={urlString} target= '_blank' textAlign='center'>
                {url}
              </Header>
            </Table.Cell>
            <Table.Cell singleLine>{clicks}</Table.Cell>
            <Table.Cell>
              <Rating icon='star' defaultRating={3} maxRating={3} />
            </Table.Cell>
            <Table.Cell textAlign='right'>
              80% <br />
              <a href='#'>18 studies</a>
            </Table.Cell>
            <Table.Cell>
              {comments}
            </Table.Cell>
          </Table.Row>
        );
      })}
    </Table.Body>
    </Table>
  );
};

export default LinksTable;
