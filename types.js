import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Query {
        venues: [Venue]
    }

    type Venue {
        name: String
        votes: Int
    }

    type Mutation {
        addVenue(name:String): Venue
        voteUp(name: String) : Venue
        voteDown(name: String) : Venue
    }

    type Subscription {
        venueAdded: Venue
        votedUpDown(name: String): Venue
    }
`;