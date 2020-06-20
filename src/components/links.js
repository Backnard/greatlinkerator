import React, { useState, useEffect } from 'react';
import { List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LinksList = async ({ linksArray }) => {

  useEffect(()=>{
    const [links, setlinks] = useState([]);
    const resp = await axios.get('http://localhost:3001/api/links');
    console.log('retrieved linkslist from links component:',resp);
    setlinks([resp]);
  }, []);


  return(  

    links.map(({url, clicks, comments})=>{
      <List>
          <List.Item>
            <List.Icon name='marker' />
            <List.Content>
              <List.Header as='a'>{url}</List.Header>
              <List.Description>
                {comments}
              </List.Description>
            </List.Content>
          </List.Item>
        </List>

    })
  
  );
  }

export default LinksList;