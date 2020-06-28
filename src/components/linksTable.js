import React, { useState, useEffect } from "react";
// import { List } from "semantic-ui-react";
import { Header, Table, Rating, Button, Tab, Icon } from "semantic-ui-react";
import axios from "axios";
import { TableRow, EditRow} from "../components";


const LinksTable = ({ results, setResults, setRefresh }) => {
  const [editMode, setMode] = useState({mode: true, rowId: ''});
  const handleClick = async (event) => {
    event.preventDefault();
    const id = event.target.id;
    if (id) {
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
          <Table.HeaderCell>Ranking</Table.HeaderCell>
          <Table.HeaderCell>Comments</Table.HeaderCell>
          <Table.HeaderCell>Tags</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body onClick={handleClick}>
        {results.map((result) => {
          if (editMode.mode === true && result.id == editMode.rowId) {
            return (
              <EditRow key={result.id} result={result} setMode={setMode}
              editMode={editMode} />
            );
          } else {
            return <TableRow key={result.id} result={result} 
            setMode={setMode} 
            editMode={editMode} />;
          }
        })}
      </Table.Body>
    </Table>
  );
};

export default LinksTable;
