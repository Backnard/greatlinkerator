import React, {useState, useEffect} from 'react'
import { Button,
  Divider,
  Grid,
  Header,
  Icon,
  Search,
  Segment, } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import faker from 'faker';


const SearchCreate = ({ setResults, setShowModal }) => {
  const [url, setUrl] = useState();

  const hanleInputChange = event => {
    event.preventDefault();
    setUrl( event.target.value );
    // setParams(event.target.value);
    // console.log('Search Params: ', url);
    
    if(url){
      axios.get(`/api/SearchResults/${url}`)
      .then(res=>{
        console.log("Entered components search. Found: ", res.data.data)
        return setResults(res.data.data);
      })

    }
  }

  const handleSubmit= event =>{
     event.preventDefault();
    
    //  setShowModal(true);
    //  will be updated after test!
     const data = {
       url: 'legendOfZelda.com',
       comment: 'why wont this work?',
       date: '03/22/2022'
     }
     axios.post('/api/links', data);
  }

  return (
  <Segment placeholder>
  <Grid columns={2} stackable textAlign='center'>
    <Divider vertical>Or</Divider>

    <Grid.Row verticalAlign='middle'>
      <Grid.Column>
        <Header icon>
          <Icon name='search' />
          Find Links
        </Header>

        <Search 
          placeholder='Search links...'
          onSearchChange={ hanleInputChange } />
      </Grid.Column>

      <Grid.Column>
        <Header icon>
          <Icon name='world' />
          Add New Link
        </Header>
        <Button 
          primary
          onClick={ handleSubmit }>
            Create
        </Button>
      </Grid.Column>
    </Grid.Row>
  </Grid>
</Segment>
  )
}


export default SearchCreate;