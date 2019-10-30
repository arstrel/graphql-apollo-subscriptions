import { gql } from 'apollo-boost';

export const VENUES = gql`
  {
    venues {
      name
      votes
    }
  }
`;

export const VENUE_ADDED = gql`
  subscription {
    venueAdded {
      name
      votes
    }
  }
`;

export const VOTED_UP_DOWN = gql`
  subscription {
    votedUpDown {
      name
      votes
    }
  }
`;

export const VOTE_UP = gql`
  mutation VoteUp($name: String) {
    voteUp(name: $name) {
      name
      votes
    }
  }
`;

export const VOTE_DOWN = gql`
  mutation VoteDown($name: String) {
    voteDown(name: $name) {
      name
      votes
    }
  }
`;

export const ADD_VENUE = gql`
  mutation AddVenue($name: String) {
    addVenue(name: $name) {
      name
      votes
    }
  }
`;
