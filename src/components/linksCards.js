import React, { useState, useEffect } from "react";
import { List, Button, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

const LinksCard = ({ results, setResults, params }) => {

  useEffect(() => {
    axios.get("/api/links").then((resp) => {
      console.log(
        "Entered Components links. Returning links:",
        resp.data.links
      );
      
      // return setLinks(resp.data.links);
      return setResults(resp.data.links);
    });
  }, []);


  // useEffect(()=>{
  //   if(!params.length){
  //     axios.get('api/links')
  //       .then((resp)=>{
  //         setResults(resp.data.links)});
  //   }
  // }, [params])

  // console.log("Links from setLinks is:", links);
  console.log('Links from setResults is: ', results);

  return(
    <Card.Group>
        {results.map(({id, url, clicks, comments})=>{

            const urlString = `http://${url}`;
      return(
      <Card key={id}>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://vignette.wikia.nocookie.net/nintendo/images/f/f2/The_Legend_of_Zelda_-_Link%E2%80%99s_Awakening_-_Link.png/revision/latest?cb=20190806182731&path-prefix=en'
          />
          <Card.Header>
              <a href = {urlString} target='_blank'>
              {url}
              </a>
            </Card.Header>
          <Card.Meta>{clicks}</Card.Meta>
          <Card.Description>
            {comments}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>
              Share
            </Button>
            <Button basic color='red'>
              Delete
            </Button>
          </div>
        </Card.Content>
      </Card>
      )}
        )}
      </Card.Group>
  )
};

export default LinksCard;