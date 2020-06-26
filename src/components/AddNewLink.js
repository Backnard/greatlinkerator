import React, {} from 'react'


const AddNewLink = () =>{
  const handleSubmit = (event) => {
      const linkFormData = new FormData(event.target);
      event.preventDefault();
      for (let [key, value] of linkFormData.entries()) {
          console.log(key, value);
      }
  }

  return (
      <div>
      <form onSubmit={
      handleSubmit
      }

      >
      <input type="text" name="LINKDATA" placeholder="ADD NEW LINK TO SAVE" />
      <button type="submit">ADD NEW LINK</button>
      </form>
      </div>)
      }


  export default AddNewLink;