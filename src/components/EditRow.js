import React, {useState} from "react";
import axios from "axios";
import { Header, Table, Rating, Button, Tab, Icon } from "semantic-ui-react";

const EditRow = ({result, setMode, editMode}) => {
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

  const handleUpdate = async (event, data) => {
    const { name, clicks, id } = data;
    console.log("Clicked edit. : ", name, clicks);
    axios.patch(`/api/links/${id}`, { clicks: 252 }).then((res) => {
      return res.data.data.clicks;
    });

    console.log("Clicked edit button. data: ", data.data);
  };

  const handleInput = (event) => {

    const{name, value} = event.target;

    setInput({...input, [name]: value});
  }

  const handleEdit = (event) => {
    const id = event.target.id
    setMode({mode: false, rowId: id})
    console.log('input: ', input);

    axios.patch(`/api/links/${id}`, input)
      .then((res)=>{
        console.log('tag updated: ', res.data.data)
      })
  }

  return (
    <Table.Row key={id}>
      <Table.Cell>
        <Button 
        id = {id}
        onClick={handleEdit}/>
      </Table.Cell>
      <Table.Cell>
        <input
          name={"url"}
          id={id}
          placeholder={url}
          onInput={handleInput}
        >
        </input>
      </Table.Cell>
      <Table.Cell>
        <Header>
          {clicks}
        </Header>
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
      <Table.Cell textAlign="right">
        80% <br />
        <a href="#">18 studies</a>
      </Table.Cell>
      <Table.Cell>
      <input
          name={"comments"}
          id={id}
          placeholder={comments}
          onInput={handleInput}
        >
        </input></Table.Cell>
      <Table.Cell>
      {tagsString}
      </Table.Cell>
    </Table.Row>
  );
};

export default EditRow;
