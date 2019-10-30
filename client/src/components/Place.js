import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { VOTE_UP, VOTE_DOWN } from '../queries/queries';
import { useMutation } from '@apollo/react-hooks';
import { useEffect } from 'react';

const Place = ({ name, votes, subscribeToFreshVotes }) => {
  
  useEffect(()=> {
    subscribeToFreshVotes(name);
  }, [])
  
  const [voteUp, { data }] = useMutation(VOTE_UP);
  const [voteDown, { data: fresh }] = useMutation(VOTE_DOWN);



  return (
    <div>
      <div style={{display: "flex"}}>
        <Button
          onClick={() => voteUp({ variables: { name } })}
          variant="outlined"
          color="primary"
        >
          Yay!
        </Button>
        <Typography variant="h6">{name}</Typography>
        <Button
          onClick={() => voteDown({ variables: { name } })}
          variant="outlined"
          color="primary"
        >
          Nay!
        </Button>
      </div>
      <Typography variant="body1">Votes: {votes}</Typography>
    </div>
  );
};

export default Place;
