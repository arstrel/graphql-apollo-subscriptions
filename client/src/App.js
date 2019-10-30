import React from 'react';
import AddPlace from './components/AddPlace';
import Typography from '@material-ui/core/Typography';
import LunchOptions from './components/LunchOptions';
import { useQuery } from '@apollo/react-hooks';
import { VENUES, VOTED_UP_DOWN } from './queries/queries';

function App() {
  const { data, loading, subscribeToMore } = useQuery(VENUES);

  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h2">Lunch Voter!</Typography>
      </header>
      <div>
        <AddPlace />
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
                  const x = prev.venues.filter( aitem => ! [updatedVenueInfo].find(
                    bitem => aitem.name === bitem.name
                    ))
                    const y = x.concat(updatedVenueInfo)

                  return {venues: y};
                },
              })
            }
          />
        )}
      </div>
    </div>
  );
}

export default App;
