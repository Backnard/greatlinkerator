import React, {setState, useState} from 'react';
import { Form } from 'semantic-ui-react';
import axios from 'axios';


const AddNewLink = ({setRefresh}) =>{
    const initialFormData = Object.freeze({})

    const [formData, setFormData] = useState(initialFormData);
    const {url, comment, tags} = formData;

const handleURL = (e) => {
    setFormData({
        ...formData, url : e.target.value
    });

}

const handleComments = (e) => {
    setFormData({
        ...formData,comment : e.target.value
    });
}

const handleTags = (e) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',');
    setFormData({
        ...formData,tags : tagsArray
    });
}

  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
    // ... submit to API or something
    axios.post('/api/links', formData)
        .then((res)=>{
            console.log('new tag created:', res.data.data);
            setRefresh(true);

        })
    

  };

  return (
     
    <Form onSubmit={handleSubmit}>
    <Form.Group widths='equal'>
      <Form.Input fluid label='URL' placeholder='www.YOUR_URL.com'
      name='url'
      value = {url}
      onChange={handleURL} />
      <Form.Input fluid label='Comments' placeholder='I love this site...' 
      name='comment'
      value={comment}
      onChange={handleComments} />
      <Form.Input fluid label='tags'
      placeholder='Seperate tags by comma (,)'
      name='tags'
      value={tags}
      onChange={handleTags} />
    </Form.Group>
    <Form.Button>Submit</Form.Button>
  </Form>
  )
}


  export default AddNewLink;