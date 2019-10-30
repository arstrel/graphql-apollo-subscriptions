import React from 'react';
import Place from './Place';
import { useSubscription } from '@apollo/react-hooks';
import { VENUE_ADDED } from '../queries/queries';

const LunchOptions = ({ options = [], subscribeToFreshVotes }) => {
  const { data, loading } = useSubscription(VENUE_ADDED);

  return (
    <div>
      {options
        .sort((a, b) => b.votes - a.votes)
        .map((venue, index) => (
          <Place
            key={index}
            {...venue}
            subscribeToFreshVotes={subscribeToFreshVotes}
          />
        ))}
      {!loading && (
        <Place
          {...data.venueAdded}
          subscribeToFreshVotes={subscribeToFreshVotes}
        />
      )}
    </div>
  );
};

export default LunchOptions;
