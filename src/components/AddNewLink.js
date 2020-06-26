import React, {} from 'react';
import { Form } from 'semantic-ui-react';


const AddNewLink = () =>{
  const handleSubmit = (event) => {
      const linkFormData = new FormData(event.target);
      event.preventDefault();
      for (let [key, value] of linkFormData.entries()) {
          console.log(key, value);
      }
  }

  return (
    <Form>
    <Form.Group widths='equal'>
      <Form.Input fluid label='URL' placeholder='www.YOUR_URL.com' />
      <Form.Input fluid label='Comments' placeholder='I love this site...' />
    </Form.Group>
    <Form.Button onSubmit={handleSubmit}>Submit</Form.Button>
  </Form>
  )
      }


  export default AddNewLink;