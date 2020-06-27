import React, { useState, useEffect } from "react";
// import { List } from "semantic-ui-react";
import { Header, Table, Rating, Button, Tab, Icon } from "semantic-ui-react";
import axios from "axios";


const LinksTable = ({ results, setResults, setRefresh }) => {
  const handleClick = async (event) => {
    event.preventDefault();
    console.log('testing click handler');
    const id = event.target.id;
    if (id) {
      console.log("here's your ID: ", id);
      axios.get(`/api/links/${id}`)

      //REMOVING LIST REFRESH! PUT BACK???
      .then(()=>{
        return setRefresh(true);
      })

    }
  }

  const handleRate = async (event, data)=>{
    const id = data.rating_id;
    console.log('From rating:', data.rating, 'rating id:', id);
    axios.patch(`/api/links/${id}`, {rating: data.rating})
      .then((res)=>{
        console.log('Updated links: ', res.data.data)
        return res.data.data;
      })
;
  }

  const handleUpdate = async (event, data)=>{
    const {name, clicks, id} = data;
    console.log('Clicked edit. : ', name, clicks);
    axios.patch(`/api/links/${id}`, {clicks:252})
      .then((res)=>{
        console.log('Updated click count: ', res.data.data.clicks);
        return res.data.data.clicks;
      })

    console.log('Clicked edit button. data: ', data.data);


  }

  return (
    <Table celled padded>
    <Table.Header>
      <Table.Row>

        <Table.HeaderCell>Link URL</Table.HeaderCell>
        <Table.HeaderCell>Click Count</Table.HeaderCell>
        <Table.HeaderCell>Rating</Table.HeaderCell>
        <Table.HeaderCell>Ranking</Table.HeaderCell>
        <Table.HeaderCell>Comments</Table.HeaderCell>
        <Table.HeaderCell>Tags</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body onClick={handleClick}>
      {results.map(({ id, url, clicks, comments, tags, rating }) => {
          const urlString = `http://${url}`;
          const tagsString = tags.map(tag=>tag.name).join(', ');
          console.log(tagsString);
        return (
            <Table.Row key={id}>

            <Table.Cell>
              <Header as='a' href={urlString} target= '_blank' textAlign='center' id={id}>
                {url}
              </Header>
            </Table.Cell>
            <Table.Cell>
              <Header>{clicks}</Header> 
              <Header.Subheader><Button onClick={handleUpdate}
              data={clicks}
              name={'clicks'}
              id={id}><Icon name='shop'
              ></Icon></Button></Header.Subheader>
              </Table.Cell>
            <Table.Cell>
              <Rating icon='star' defaultRating={rating} maxRating={3}
              rating_id={id}
              onRate = {handleRate} />
            </Table.Cell>
            <Table.Cell textAlign='right'>
              80% <br />
              <a href='#'>18 studies</a>
            </Table.Cell>
            <Table.Cell>
              {comments}
            </Table.Cell>
            <Table.Cell>
              {tagsString}
            </Table.Cell>
          </Table.Row>
        );
      })}
    </Table.Body>
    </Table>
  );
};

export default LinksTable;
