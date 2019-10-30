import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { useMutation } from '@apollo/react-hooks';
import { ADD_VENUE } from '../queries/queries';

const AddPlace = () => {
  const [add, { data }] = useMutation(ADD_VENUE);
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    add({
      variables: { name: value },
    });
    setValue('');
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
        style={{"width":"100%"}}
      />
      <br/><br/>
      <Button variant="contained" color="primary" type="submit">
        Add this place
      </Button>
    </form>
  );
};

export default AddPlace;
