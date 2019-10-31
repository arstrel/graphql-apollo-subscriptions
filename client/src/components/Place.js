import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { VOTE_UP, VOTE_DOWN } from '../queries/queries';
import { useMutation } from '@apollo/react-hooks';

const Place = ({ name, votes, subscribeToFreshVotes }) => {
  
  const [voteUp, { data }] = useMutation(VOTE_UP);
  const [voteDown, { data: fresh }] = useMutation(VOTE_DOWN);

  return (
    <div>
      <div className="place-button-title-group">
        <Button
          onClick={() => voteDown({ variables: { name } })}
          variant="outlined"
          color="primary"
        >
          👎Nope
        </Button>
        <Typography variant="h6">{name}</Typography>
        <Button
          onClick={() => voteUp({ variables: { name } })}
          variant="outlined"
          color="primary"
        >
          Yay 👍
        </Button>
      </div>
      <Typography variant="body1">Votes: {votes}</Typography>
    </div>
  );
};

export default Place;
