import React, { useState, useEffect } from "react";
// import { List } from "semantic-ui-react";
import { Header, Table, Rating, Button, Tab, Icon } from "semantic-ui-react";
import axios from "axios";
import { TableRow, EditRow} from "../components";


const LinksTable = ({ results, setResults, setRefresh }) => {
  const [editMode, setMode] = useState({mode: true, rowId: ''});

  const handleClick = async (event, data) => {
    // event.preventDefault();
    const id = event.target.id;
    const urlid=event.target.href;
    console.log('URL ID: ', urlid);
    if (urlid) {

      axios
        .get(`/api/links/${id}`)

        .then(() => {
          return setRefresh(true);
        });
    }
  };

  return (
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Edit</Table.HeaderCell>
          <Table.HeaderCell>Link URL</Table.HeaderCell>
          <Table.HeaderCell>Click Count</Table.HeaderCell>
          <Table.HeaderCell>Rating</Table.HeaderCell>
          <Table.HeaderCell>Comments</Table.HeaderCell>
          <Table.HeaderCell>Tags</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body onClick={handleClick}>
        {results.map((result) => {
          if (editMode.mode === true && result.id == editMode.rowId) {
            return (
              <EditRow key={result.id} result={result} setMode={setMode}
              editMode={editMode}
              setRefresh={setRefresh} />
            );
          } else {
            return <TableRow 
            key={result.id} 
            result={result} 
            setMode={setMode} 
            setRefresh={setRefresh} />;
          }
        })}
      </Table.Body>
    </Table>
  );
};

export default LinksTable;
