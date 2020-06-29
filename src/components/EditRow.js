import React, { useState } from "react";
import axios from "axios";
import { Header, Table, Rating, Button, Tab, Icon } from "semantic-ui-react";

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

  const handleUpdate = async (event, data) => {
    const { name, clicks, id } = data;
    console.log("Clicked edit. : ", name, clicks);
    axios.patch(`/api/links/${id}`, { clicks: 252 }).then((res) => {
      setRefresh(true);
      return res.data.data.clicks;
    });

    console.log("Clicked edit button. data: ", data.data);
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
      if (!input||input=={}) {
        console.log('Input length is empty: ',input);
        return;
      }
      axios.patch(`/api/links/${id}`, input).then((res) => {
        console.log("tag updated: ", res.data.data);
        // setRefresh(true);
        // return res.data.data;
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
    console.log('tagsArray: ', tagsArray, 'id:', id);
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
        <Button 
        id={id} 
        icon={"check square outline"}
        onClick={handleEdit} />
        <Button
        id={id} 
        icon={"delete"}
        onClick={handleDelete}/>
      </Table.Cell>
      <Table.Cell>
        <input
          name={"url"}
          id={id}
          onInput={handleInput}
          defaultValue={url}
        ></input>
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
        <input
          name={"comments"}
          id={id}
          defaultValue={comments}
          onInput={handleInput}
        ></input>
      </Table.Cell>
      <Table.Cell>
      <input
          name={"tags"}
          id={id}
          // placeholder={tagsString}
          defaultValue={tagsString}
          onInput={handleTags}>   
          </input>
        </Table.Cell>
    </Table.Row>
  );
};

export default EditRow;
