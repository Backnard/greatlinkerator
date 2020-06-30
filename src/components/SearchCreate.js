import React, { useState } from 'react'
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react'
import SearchBar from './SearchBar'
import AddNewLinks from './AddNewLink'
import AddNewLink from './AddNewLink'


const SegmentGrid = ({results, setResults, searchTerm, setSearchTerm, refresh, setRefresh}) => {

 const [showForm, setShowForm] = useState(false);

const handleClick = (event) =>{

    !showForm? setShowForm(true):setShowForm(false);
    console.log('Entered show form click! Showform is: ', showForm);
}

    return (


    <Segment placeholder>
      <Grid columns={2} stackable textAlign='center'>
        <Divider vertical>Or</Divider>
  
        <Grid.Row verticalAlign='middle'>
          <Grid.Column>
            <SearchBar
                results={results}
                setResults={setResults}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                refresh={refresh}
                setRefresh={setRefresh}/>
          </Grid.Column>
  
          <Grid.Column>
          {showForm
            ?<>
            <AddNewLink
                setRefresh={setRefresh}/>
                <br/>
                <Button primary
            onClick={handleClick}>Hide</Button>
            </>
            :<>
            <Header icon>
              <Icon name='world' />
              Add New Link
            </Header>
            <Button primary
            onClick={handleClick}>Create</Button>
            </>
          }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    )
}
  
  export default SegmentGrid