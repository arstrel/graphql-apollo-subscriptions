import React from 'react';
import Place from './Place';
import { useSubscription } from '@apollo/react-hooks';
import { VENUE_ADDED } from '../queries/queries';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const LunchOptions = ({ options = [], subscribeToFreshVotes }) => {
  const { data, loading } = useSubscription(VENUE_ADDED);
  const style = {
    "text-align": "center",
    "padding": "15px"
  }
  return (
    <Grid container spacing={1}>
      {options
        .sort((a, b) => b.votes - a.votes)
        .map((venue, index) => (
          <Grid item xs={8}>
            <Paper style={style}>
              <Place
                key={index}
                {...venue}
                subscribeToFreshVotes={subscribeToFreshVotes}
              />
            </Paper>
          </Grid>
        ))}
      {!loading && (
        <Place
          {...data.venueAdded}
          subscribeToFreshVotes={subscribeToFreshVotes}
        />
      )}
    </Grid>
  );
};

export default LunchOptions;
