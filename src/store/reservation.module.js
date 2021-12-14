import gql from 'graphql-tag';
import graphqlClient from '../main';


export const reservation = {
	state: {
		detailQuote: null,
		reserve: null,
	},
	getters: {
		detailQuote: state => state.detailQuote,
		reserve: state => state.reserve,
	},	
	mutations: {
		setDetailQuote(state, payload) {
			state.detailQuote = payload;
		},
		setReserve(state, payload) {
			state.reserve = payload;
		}
	},
	actions: {
		async searchParkingLot({ commit }, quote) {
			console.log(quote);
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
				console.warn("   here  " + error.message);
			}
		},
		async createReserve({ commit }, reserve) {
			console.log("create reservation")
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
				console.warn("   here  " + error.message);
			}			
		},
		updateDetailQuote({ commit }, detailQuote) {
			commit("setDetailQuote", detailQuote);
		},
	
	},
	modules: {
	}
}
