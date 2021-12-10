import gql from 'graphql-tag';
import graphqlClient from '../main';


export const reservation = {
	state: {
		detailQuote: null,
		sessionInfo: undefined,
	},
	getters: {
		detailQuote: state => state.detailQuote,
	},	
	mutations: {
		setDetailQuote(state, payload) {
			state.detailQuote = payload;
		},
        // eslint-disable-next-line no-unused-vars
		setSession(state, payload) {
			
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
				console.info(response.data.computeQuote);
				commit("setDetailQuote", response.data.computeQuote);
			} catch (error) {
				console.warn("   here  " + error.message);
			}
		},
        // eslint-disable-next-line no-unused-vars
		async logInUser({ commit }, user) {

		},
        // eslint-disable-next-line no-unused-vars
		async signUpUser({ commit }, user) {

		},		
	},
	modules: {
	}
}
