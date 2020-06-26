import React, {useState} from 'react'
import { List,
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Search,
  Segment, } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";


const searchBar = ({ results, setResults, searchTerm, setSearchTerm }) => {


  function searchMatches(result, compare) {
    console.log('searchMatches, results: ', results, 'compare: ', compare);
    const { id, url, comments } = result;
    const newId = id.toString();
    const filterOn = [newId, url, comments];
  
    return filterOn.some((string) => {
      return string.toLowerCase().includes(compare);
    });
  }

  const handleLinkChange = event => {
    event.preventDefault();
    setSearchTerm( event.target.value)
    

    console.log('SearchBar results: ', results);
      let filteredResults = results.filter((result) =>
      searchMatches(result, searchTerm)
    );
    console.log("your filtered search results: ", filteredResults);
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