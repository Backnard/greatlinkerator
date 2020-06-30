import React from "react";
import axios from "axios";
import {
  Header,
  Table,
  Rating,
  Button,
  Tab,
  Icon,
  ButtonContent,
} from "semantic-ui-react";

const TableRow = ({ result, setMode, setRefresh }) => {
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

  const handleEdit = (event, data) => {
    const id = data.id;
    setMode({ mode: true, rowId: id });
  };

  return (
    <Table.Row key={id}>
      <Table.Cell>
        <Button animated="vertical" onClick={handleEdit} id={id}>
          <Button.Content hidden>{"Edit"}</Button.Content>
          <Button.Content id={id} visible>
            <Icon name={"edit"} />
          </Button.Content>
        </Button>
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
