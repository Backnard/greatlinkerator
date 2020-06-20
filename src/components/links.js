import React, { useState, useEffect } from 'react';
import { List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LinksList =  ({ linksArray }) => {
  const [links, setlinks] = useState([]);

  useEffect(()=>{
    
    axios.get('/api/links')
    .then((resp)=>{
      return setlinks(resp.data.links)
    });

  }, []);


  return(  

    links.map(({url, clicks, comments})=>{
      <List>
          <List.Item>
            <List.Icon name='marker' />
            <List.Content>
              <List.Header as='a'>Why arent you showing up?</List.Header>
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