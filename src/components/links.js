import React, { useState, useEffect } from 'react';
import { List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LinksList =  ({ linksArray }) => {
  const [links, setlinks] = useState([]);

  useEffect(()=>{
    
    axios.get('/api/links')
    .then((resp)=>{
      console.log('Entered Components links. Returning links:', resp.data.links);

      return setlinks(resp.data.links)
    });

  }, []);
  console.log('Links from setLinks is:', links);

  return(  
  <List>
    {links.map(({id, url, clicks, comments})=>{
      <List.Item key={id}>
              <List.Icon name='marker' />
              <List.Content>
                <List.Header as='a'></List.Header>
                <List.Description>
                  AM I BEING RETURNED? 
                  {comments}
                </List.Description>
              </List.Content>
            </List.Item>

    })
  }
            
        </List>

  
  );
  }

export default LinksList;