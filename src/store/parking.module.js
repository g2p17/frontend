import gql from 'graphql-tag';
import graphqlClient from '../main';


export const parking = {
	state: {
		parkinglots: [],
		parkinglotsByadmin: [],
	},
	getters: {
		parkinglots: state => state.parkinglots,
		parkinglotsByadmin: state => state.parkinglotsByadmin,
	},	
	mutations: {
		setParkinglots(state, payload) {
			state.parkinglots = payload;
		},
		setParkinglotsByadmin(state, payload) {
			state.parkinglotsByadmin = payload;
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
		async getParkinglotsByAdmin({ commit }, userId) {

			try {
				const response = await graphqlClient.query({
					query: gql`
					query ListParking_admin($adminId: String!) {
						listParking_admin(adminId: $adminId) {
							id
							admin_id
							parking_place
							vehicle_slots
							motorcycles_slots
							bicycles_slots
							person_with_disability_slots
							vehicle_price
							motorcycles_price
							bicycles_price
							person_with_disability_price
						}
					}`,
					variables: {
						adminId: userId,
					},
				});

				console.info(response.data.listParking_admin);
				commit("setParkinglotsByadmin", response.data.listParking_admin);
			} catch (error) {
				let err = error.graphQLErrors.map(({ extensions }) => extensions.response);
				console.info(err);
				commit("setError", err);
			}
		},
		updateParkingState({ commit }) {
			commit("setParkinglotsByadmin", []);
		}
	
	},
	modules: {
	}
}
