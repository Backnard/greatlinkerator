import React from "react";
import axios from "axios";
import { Header, Table, Rating, Button, Tab, Icon } from "semantic-ui-react";

const TableRow = ({result, setMode, setRefresh}) => {
  const { id, url, clicks, comments, tags, rating } = result;
  const urlString = `http://${url}`;
  const tagsString = tags.map((tag) => tag.name).join(", ");

  const handleRate = async (event, data) => {
    const id = data.rating_id;
    axios.patch(`/api/links/${id}`, { rating: data.rating }).then((res) => {
      setRefresh(true);
      return res.data.data;
    });
  };

  const handleEdit = (event) => {
    const id = event.target.id
    setMode({mode: true, rowId: id})
  }

  return (
    <Table.Row key={id}>
      <Table.Cell>
        <Button 
        icon="edit"
        id={id}
        onClick={handleEdit}/>
        <Button
        icon="delete"
        id={id}/>
      </Table.Cell>
      <Table.Cell>
        <Header
          as="a"
          href={urlString}
          target="_blank"
          textAlign="center"
          id={id}
        >
          {url}
        </Header>
      </Table.Cell>
      <Table.Cell>
        <Header>{clicks}</Header>
      </Table.Cell>
      <Table.Cell>
        <Rating
          icon="star"
          defaultRating={rating}
          maxRating={3}
          rating_id={id}
          onRate={handleRate}
        />
      </Table.Cell>
      <Table.Cell>{comments}</Table.Cell>
      <Table.Cell>{tagsString}</Table.Cell>
    </Table.Row>
  );
};

export default TableRow;
