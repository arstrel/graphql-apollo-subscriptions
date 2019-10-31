import { PubSub } from 'apollo-server-express';
import { find } from 'lodash';

const pubsub = new PubSub();
const VENUE_ADDED = 'VENUE_ADDED';
const VOTE_UP = 'VOTE_UP';
const VOTE_DOWN = 'VOTE_DOWN';

export const resolvers = {
    Query: {
        venues: (parent, args, ctx, info) => {
            return ctx.venues
        },
    },
    Mutation: {
        addVenue: (parent, { name }, { venues }, info) => {
            const newVenue = {
                name,
                votes: 0
            };
            venues.push(newVenue);
            pubsub.publish(VENUE_ADDED, {venueAdded: newVenue});
            return newVenue
        },
        voteUp: (parent, { name }, { venues }, info) => {
            for(let val of venues) {
                if(val.name == name) {
                    val.votes += 1;
                }
            };

            const result = find(venues, { name });
            pubsub.publish(VOTE_UP, { votedUpDown: result});
            return result
        },
        voteDown: (parent, { name }, { venues }, info) => {
            for(let val of venues) {
                if(val.name == name) {
                    val.votes -= 1;
                }
            };

            const result = find(venues, { name });
            pubsub.publish(VOTE_DOWN, { votedUpDown: result});
            return result
        }

    },
    // Subscriptions have the same signature of (parent, args, context, info)
    Subscription: {
        venueAdded: {
            subscribe: () => pubsub.asyncIterator([VENUE_ADDED])
        },
        votedUpDown: {
            subscribe: () => pubsub.asyncIterator([VOTE_UP, VOTE_DOWN])
        }
    }

}
