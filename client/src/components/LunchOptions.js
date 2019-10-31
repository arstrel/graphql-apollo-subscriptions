import React from 'react';
import { useEffect } from 'react';
import Place from './Place';
import { useSubscription } from '@apollo/react-hooks';
import { VENUE_ADDED } from '../queries/queries';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const LunchOptions = ({ options = [], subscribeToFreshVotes }) => {
  useEffect(() => {
    subscribeToFreshVotes();
  }, []);

  // comenting it out to avoid duplicate entry in the list
  // that is a great way to implement subscriptions with apollo hooks
  // const { data, loading } = useSubscription(VENUE_ADDED);
  console.log(options)
  return (
    <Grid container spacing={1}>
      {options
        .sort((a, b) => b.votes - a.votes)
        .map((venue, index) => (
          <Grid item xs={8} key={`place-${index}`}>
            <Paper className="venue-item">
              <Place {...venue} subscribeToFreshVotes={subscribeToFreshVotes} />
            </Paper>
          </Grid>
        ))}
      {/* {!loading && (
        <Grid item xs={8}>
          <Paper className="venue-item">
            <Place
              {...data.venueAdded}
              subscribeToFreshVotes={subscribeToFreshVotes}
            />
          </Paper>
        </Grid>
      )} */}
    </Grid>
  );
};

export default LunchOptions;
