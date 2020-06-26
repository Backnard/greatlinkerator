import React, {setState, useState} from 'react';
import { Form } from 'semantic-ui-react';


const AddNewLink = () =>{
    const initialFormData = Object.freeze({url:'', comment: '', tags:[]})

    const [formData, setFormData] = useState(initialFormData);


const handleChange = (e) => {
    let tagsArray=[];
    if(e.target.name==='tags'){
        console.log('IM A TAG DAMNIT', e.target.value);
        const stringTags = e.target.value;
        tagsArray = stringTags.split(',');
    }
    setFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    
    });

  };
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
    // ... submit to API or something

  };

  return (
    <Form>
    <Form.Group widths='equal'>
      <Form.Input fluid label='URL' placeholder='www.YOUR_URL.com'
      name='url'
      onChange={handleChange} />
      <Form.Input fluid label='Comments' placeholder='I love this site...' 
      name='comment'
      onChange={handleChange} />
      <Form.Input fluid label='tags'
      placeholder='Seperate tags by comma (,)'
      name='tags'
      onChange={handleChange} />
    </Form.Group>
    <Form.Button onClick={handleSubmit}>Submit</Form.Button>
  </Form>
  )
      }


  export default AddNewLink;