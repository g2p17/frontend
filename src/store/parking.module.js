import gql from 'graphql-tag';
import graphqlClient from '../main';


export const parking = {
	state: {
		parkinglots: [],
	},
	getters: {
		parkinglots: state => state.parkinglots,
	},	
	mutations: {
		setParkinglots(state, payload) {
			state.parkinglots = payload;
		},
	},
	actions: {
		async getParkinglots({ commit }) {

			try {
				const response = await graphqlClient.query({
					query: gql`
                    query ExampleQuery {
                        parkings {
                            id
                            admin_id
                            parking_place
                            vehicle_slots
                            motorcycles_slots
                            bicycles_slots
                            person_with_disability_slots
                            vehicle_price
                            motorcycles_price
                            person_with_disability_price
                            bicycles_price
                        }
                    }`,
					variables: {

					},
				});

				console.info(response.data.parkings);
				commit("setParkinglots", response.data.parkings);
			} catch (error) {
				let err = error.graphQLErrors.map(({ extensions }) => extensions.response);
				console.info(err);
				commit("setError", err);
			}
		},
        // eslint-disable-next-line no-unused-vars
		async createReserve({ commit }, reserve) {

		},
	
	},
	modules: {
	}
}
