import gql from 'graphql-tag';
import graphqlClient from '../main';


export const reservation = {
	state: {
		detailQuote: undefined,
		detailQuoteState: undefined,
		reservationsByParkinglot: [],
		customersByParkinglot: [],
		reserve: null,
	},
	getters: {
		detailQuote: state => state.detailQuote,
		detailQuoteState: state => state.detailQuoteState,
		reservationsByParkinglot: state => state.reservationsByParkinglot,
		customersByParkinglot: state => state.customersByParkinglot,
		reserve: state => state.reserve,
	},	
	mutations: {
		setDetailQuote(state, payload) {
			state.detailQuote = payload;
		},
		setDetailQuoteState(state, payload) {
			state.detailQuoteState = payload;
		},		
		setReserve(state, payload) {
			state.reserve = payload;
		},
		setReservationsByParkinglot(state, payload) {
			state.reservationsByParkinglot = payload;
		},
		setCustomersByParkinglot(state, payload) {
			state.customersByParkinglot = payload;
		}
	},
	actions: {
		async searchParkingLot({ commit }, quote) {

			try {
				const response = await graphqlClient.query({
					query: gql`
                        query Query($quotation: QuotationInput!) {
                            computeQuote(quotation: $quotation) {
                                parkingLot
                                vehicleType
                                entryTime
                                price
                                state
                            }
                    }`,
					variables: {
						quotation: quote,
					},
				});

				let detailQuote = {
					parkingLot : response.data.computeQuote.parkingLot,
					vehicleType : response.data.computeQuote.vehicleType,
					entryTime : response.data.computeQuote.entryTime,
					estimatedTime : quote.estimatedTime,
					price: response.data.computeQuote.price,
					state: response.data.computeQuote.state,
				}

				console.info(detailQuote);
				commit("setDetailQuote", detailQuote);
			} catch (error) {
				let err = error.graphQLErrors.map(({ extensions }) => extensions.response);
				console.info(err);
				console.log(error.message)
				if (err[0] == undefined) {
					err = error.message;
				}					

				commit("setError", err);
			}
		},
		async createReserve({ commit }, reserve) {

			console.info(reserve);
			try {
				const response = await graphqlClient.mutate({
					mutation: gql`
					mutation Mutation($reservationInput: ReservationInput) {
						registerReservation(reservationInput: $reservationInput) {
							reservation
						}
					}`,
					variables: {
						reservationInput: reserve,
					}
				});

                console.log(response.data.registerReservation);
				commit("setReserve", response.data.registerReservation);
			} catch (error) {
				let err = error.graphQLErrors.map(({ extensions }) => extensions.response);
				console.info(err);
				commit("setError", err);
			}			
		},
		updateDetailQuote({ commit }, detailQuote) {
			commit("setDetailQuote", detailQuote);
		},
		updateDetailQuoteState({ commit }, detailQuote) {
			commit("setDetailQuoteState", detailQuote);
		},
		resetError({ commit }, value) {
			commit("setError", value);
		},
		async getParkingLotByParkinglot({ commit }, parkingPlace) {

			try {
				const response = await graphqlClient.query({
					query: gql`
					query ReservationsDetailByparkingLot($parkinglot: String!) {
						reservationsDetailByparkingLot(parkinglot: $parkinglot) {
							id
							parkingLot
							entryTime
							vehicleType
							exitTime
							estimatedTime
							vehiclePlate
						}
					}`,
					variables: {
						parkinglot: parkingPlace,
					},
				});
	
				console.info(response.data.reservationsDetailByparkingLot);
				commit("setReservationsByParkinglot", response.data.reservationsDetailByparkingLot);
			} catch (error) {
				let err = error.graphQLErrors.map(({ extensions }) => extensions.response);
				console.info(err);
				console.log(error.message)
				if (err[0] == undefined) {
					err = error.message;
				}					
	
				commit("setError", err);
			}
		},
		async getParkingLotCustomers({ commit }, parkingPlace) {

			try {
				const response = await graphqlClient.query({
					query: gql`
					query Query($parkinglot: String!) {
						reservationsDetailByparkingLotCustomers(parkinglot: $parkinglot) {
							clientId
							vehicleType
							parkingLot
							vehiclePlate
						}
					}`,
					variables: {
						parkinglot: parkingPlace,
					},
				});
	
				console.info(response.data.reservationsDetailByparkingLotCustomers);
				commit("setCustomersByParkinglot", response.data.reservationsDetailByparkingLotCustomers);
			} catch (error) {
				let err = error.graphQLErrors.map(({ extensions }) => extensions.response);
				console.info(err);
				console.log(error.message)
				if (err[0] == undefined) {
					err = error.message;
				}					
	
				commit("setError", err);
			}
		},		
	},	
	modules: {
	}
}
