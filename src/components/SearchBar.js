import React, {useState} from 'react'
import {
  List,
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Search,
  Segment, } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";


const searchBar = ({ results, setResults, setRefresh }) => {


  function searchMatches(result, compare) {
    console.log('searchMatches, results: ', results, 'compare: ', compare);
    const { id, url, comments, tags } = result;
    const tagsString = tags.map(tag=>tag.name).join(', ');
    const newId = id.toString();
    const filterOn = [newId, url, comments, tagsString];
  
    return filterOn.some((string) => {
      return string.toLowerCase().includes(compare);
    });
  }

  const handleLinkChange = event => {
    event.preventDefault();
    const searchTerm = event.target.value.toLowerCase();
    if(!searchTerm||!searchTerm.length){
      setRefresh(true);
    }
  
      let filteredResults = results.filter((result) =>
      searchMatches(result, searchTerm)
    );
    setResults(filteredResults);
  }

 return (

<Segment placeholder>
  <Grid columns={1} stackable textAlign='center'>
    <Grid.Row verticalAlign='middle'>
      <Grid.Column>
        <Header icon>
          <Icon name='search' />
          Find Links
        </Header>

        <Search 
          placeholder='Search links...'
          onSearchChange={ handleLinkChange } />
      </Grid.Column>
      </Grid.Row>
      </Grid>
</Segment>
 );
}

export default searchBar;