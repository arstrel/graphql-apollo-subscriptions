import React from 'react';
import './App.css'
import AddPlace from './components/AddPlace';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LunchOptions from './components/LunchOptions';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { useQuery } from '@apollo/react-hooks';
import { VENUES, VOTED_UP_DOWN } from './queries/queries';

function App() {
  const { data, loading, subscribeToMore } = useQuery(VENUES);
  

  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item>
            <Paper className="padding-15">
              <Typography variant="h2">Lunch Voter!</Typography>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper className="padding-15">
              <AddPlace/>
            </Paper>
          </Grid>
        </Grid>
        <div>
          {!loading && (
            <LunchOptions
              options={data.venues}
              subscribeToFreshVotes={() =>
                subscribeToMore({
                  document: VOTED_UP_DOWN,
                  variables: {},
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const updatedVenueInfo = subscriptionData.data.votedUpDown;
                    const x = prev.venues.filter(
                      aitem =>
                        ![updatedVenueInfo].find(
                          bitem => aitem.name === bitem.name
                        )
                    );
                    const y = x.concat(updatedVenueInfo);

                    return { venues: y };
                  },
                })
              }
            />
          )}
        </div>
      </Container>
    </div>
  );
}

export default App;
