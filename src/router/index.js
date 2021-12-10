import { ApolloClient, createHttpLink, InMemoryCache } 	from '@apollo/client/core'
import { createRouter, createWebHashHistory } 			from 'vue-router'
import gql 												from "graphql-tag";

import Login 											from '../views/Login.vue'
import Home 											from '../views/Home.vue'
import SignUp 											from '../views/SignUp.vue'

const routes = [
	{
		path: '/user/login',
		name: "logIn",
		component: Login,
		meta: { requiresAuth: false }
	},
	{
		path: '/user/signUp',
		name: "signUp",
		component: SignUp,
		meta: { requiresAuth: false }
	},
	{
		path: '/user/home',
		name: "home",
		component: Home,
		meta: { requiresAuth: true }
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

const apolloClient = new ApolloClient({
	link: createHttpLink({ 
		uri: `${process.env.VUE_APP_API_GATEWAY_URL}`,
	}),
	cache: new InMemoryCache()
})

async function isAuth() {
	if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
		return false;
	}

	try {
		var result = await apolloClient.mutate({
			mutation: gql`
            mutation ($token: Refresh!) {
              refreshToken(token: $token) {
                access
              }
            }
          `,
			variables: {
				token: {
					refresh: localStorage.getItem("token_refresh")
				}
			},
		})

		localStorage.setItem("token_access", result.data.refreshToken.access);
		return true;
	} catch (error) {
		console.log(error.message);
		localStorage.clear();
		alert("Su sesión expiró, por favor vuelva a iniciar sesión");
		return false;
	}
}

// eslint-disable-next-line no-unused-vars
router.beforeEach(async (to, from) => {
	var is_auth = await isAuth();

	if (is_auth == to.meta.requiresAuth)
		return true

	if (is_auth)
		return { name: "home" };

	return { name: "logIn" };
})

export default router
