import gql from 'graphql-tag';
import graphqlClient from '../main';


export const auth = {
	state: {
		userDetailById: null,
		sessionInfo: undefined,
		err: undefined,
	},
	getters: {
		userDetailById: state => state.userDetailById,
		sessionInfo: state => state.sessionInfo,
		err: state => state.err,
	},	
	mutations: {
		setDetailInfo(state, payload) {
			state.userDetailById = payload;
		},
		setSession(state, payload) {
			state.sessionInfo = payload;
		},
		setError(state, payload) {
			state.err = payload;
		},
	},
	actions: {
		async detailInfo({ commit }, userid) {

			try {
				const response = await graphqlClient.query({
					query: gql`
						query Query($userId: Int!) {
							userDetailById(userId: $userId) {
								id
								username
								name
								email
								identity_document
								phone_number
								role
							}
					}`,
					variables: {
						userId: userid,
					},
	
				});
				console.info(response.data.userDetailById);
				commit("setDetailInfo", response.data.userDetailById);
			} catch (error) {
				let err = error.graphQLErrors.map(({ extensions }) => extensions.response);
				console.info(err);
				commit("setError", err);
			}			
		},
		async logInUser({ commit }, user) {

			let response = null;
			try {
				response = await graphqlClient.mutate({
					mutation: gql`
						mutation LogIn($credentials: CredentialsInput!) {
							logIn(credentials: $credentials) {
									refresh
									access
								}
					}`,
					variables: {
						credentials: user
					}
				});
				
				let sessionInfo = {
                    username     : user.username,
                    tokenAccess  : response.data.logIn.access,
                    tokenRefresh : response.data.logIn.refresh,
                }

				console.log(sessionInfo);
				commit("setSession", sessionInfo);
			} catch (error) {		
				let err = error.graphQLErrors.map(({ extensions }) => extensions.response);
				console.info(err);
				commit("setError", err);
			}
		},
		async signUpUser({ commit }, user) {
			try {
				user.role = "customer";
				console.log(user.role)
				const response = await graphqlClient.mutate({
					mutation: gql`
						mutation SignUpUser($userInput: SignUpInput) {
							signUpUser(userInput: $userInput) {
								refresh
								access
							}
					}`,
					variables:{
						userInput: user,
					}
                });
				let sessionInfo = {
                    username     : user.username,
                    tokenAccess  : response.data.signUpUser.access,
                    tokenRefresh : response.data.signUpUser.refresh,
                }
                console.log(sessionInfo);
				commit("setSession", sessionInfo);				
			} catch (error) {
				let err = error.graphQLErrors.map(({ extensions }) => extensions.response);
				console.info(err);
				commit("setError", err);
			}
		},
		async signUpAdmin({ commit }, admin) {
			try {
				console.log(admin);
				const response = await graphqlClient.mutate({
					mutation: gql`
						mutation Mutation($userInput: SignUpInputAdmin) {
						signUpUserAdmin(userInput: $userInput) {
							refresh
							access
						}
					}`,
					variables:{
						userInput: admin,
					}
                });
				let sessionInfo = {
                    username     : admin.username,
                    tokenAccess  : response.data.signUpUserAdmin.access,
                    tokenRefresh : response.data.signUpUserAdmin.refresh,
                }
                console.log(sessionInfo);
				commit("setSession", sessionInfo);
			} catch (error) {
				let err = error.graphQLErrors.map(({ extensions }) => extensions.response);

				const body = err[0].body;
				//console.log(body);
				let errorMessage = ''
				for (let property in body) {
					if (Object.prototype.hasOwnProperty.call(body, property))
						errorMessage += " " + body[property] + "\n";
				}

				console.log(errorMessage);
				commit("setError", errorMessage);
			}
		},
	},
	modules: {
	}
}
