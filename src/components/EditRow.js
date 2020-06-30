import React, { useState } from "react";
import axios from "axios";
import { Header, Table, Rating, Button, Icon, Form, Input } from "semantic-ui-react";

const EditRow = ({ result, setMode, setRefresh }) => {
  const [input, setInput] = useState({});
  const { id, url, clicks, comments, tags, rating } = result;
  const urlString = `http://${url}`;
  const tagsString = tags.map((tag) => tag.name).join(", ");

  const handleRate = async (event, data) => {
    const id = data.rating_id;
    axios.patch(`/api/links/${id}`, { rating: data.rating }).then((res) => {
      return res.data.data;
    });
  };

  const handleInput = (event) => {
    const { name, value } = event.target;

    setInput({ ...input, [name]: value });
  };

  const handleEdit = (event, data) => {
    const id = data.id;

    setMode({ mode: false, rowId: id });
    console.log("input: ", input);
    try {
      if (!input || input == {}) {
        console.log("Input length is empty: ", input);
        return;
      }
      axios.patch(`/api/links/${id}`, input).then((res) => {
        console.log("tag updated: ", res.data.data);
      });
      setRefresh(true);
    } catch (error) {
      throw error;
    }
  };



  const handleTags = (e) => {
    const newTagsString = e.target.value;
    const id = e.target.id;
    const tagsArray = newTagsString.split(",");
    console.log("tagsArray: ", tagsArray, "id:", id);
    setInput({
      ...input,
      tags: tagsArray,
    });
  }
   const handleDelete = (event, data)=> {
     const id=data.id

      axios.delete(`/api/links/${id}`)
      .then((response) => {
        console.log(response.data.data);
        setRefresh(true);
      })
}
  
  
  return (
    <Table.Row key={id}>
      <Table.Cell>
        <Button animated="vertical" onClick={handleEdit} id={id}>
          <Button.Content hidden>{"Submit"}</Button.Content>
          <Button.Content visible>
            <Icon name={"check square outline"} />
          </Button.Content>
        </Button>
        <Button animated="vertical" onClick={handleDelete} id={id}>
          <Button.Content hidden>{"Delete"}</Button.Content>
          <Button.Content visible>
            <Icon name={"delete"} />
          </Button.Content>
        </Button>
      </Table.Cell>
      <Table.Cell>
        <Input
          name={"url"}
          id={id}
          onInput={handleInput}
          defaultValue={url}
        ></Input>
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
      <Table.Cell>
        <Input
          name={"comments"}
          id={id}
          defaultValue={comments}
          onInput={handleInput}
        ></Input>
      </Table.Cell>
      <Table.Cell>
        <Input
          name={"tags"}
          id={id}
          defaultValue={tagsString}
          onInput={handleTags}
        ></Input>
      </Table.Cell>
    </Table.Row>
  );
};

export default EditRow;
