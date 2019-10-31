import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { useMutation } from '@apollo/react-hooks';
import { ADD_VENUE, VOTE_UP } from '../queries/queries';

const AddPlace = () => {
  
  const [add, { data }] = useMutation(ADD_VENUE);
  //vote up because it makes logical sence 
  // but also to trigger the subscription
  // const [ voteUp, response ] = useMutation(VOTE_UP);
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    add({
      variables: { name: value },
    });
    setValue('');
    // voteUp({
    //   variables: {
    //     name: value
    //   }
    // })
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Add a venue"
        name="name"
        onChange={handleChange}
        value={value}
        autoFocus
        className="place-input"
      />
      <br/><br/>
      <Button variant="contained" color="primary" type="submit">
        Add this place
      </Button>
    </form>
  );
};

export default AddPlace;
