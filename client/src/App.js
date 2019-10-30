import React from 'react';
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

  const style = {
    padding: '15px',
  };

  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item>
            <Paper style={style}>
              <Typography variant="h2">Lunch Voter!</Typography>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper style={style}>
              <AddPlace />
            </Paper>
          </Grid>
        </Grid>
        <div>
          {!loading && (
            <LunchOptions
              options={data.venues}
              subscribeToFreshVotes={name =>
                subscribeToMore({
                  document: VOTED_UP_DOWN,
                  variables: { name: name },
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
