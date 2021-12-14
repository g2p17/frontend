import { ApolloClient, createHttpLink, InMemoryCache } 	from '@apollo/client/core'
import { createRouter, createWebHashHistory } 			from 'vue-router'
import gql 												from "graphql-tag";

import Login 											from '../views/Login.vue'
import Home 											from '../views/Home.vue'
import HomePublic										from '../views/HomePublic.vue'
import About											from '../views/About.vue'
import SignUp 											from '../views/SignUp.vue'
import Quotation 										from '../views/Quotation.vue'
import CheckAvailable									from '../views/CheckAvailable.vue'
import Reservation										from '../views/Reservation.vue'
import AdminUI											from '../views/AdminUI.vue'

const routes = [
	{
		path: '/',
		name: "homePublic",
		component: HomePublic,
		meta: { requiresAuth: false }
	},	
	{
		path: '/about',
		name: "about",
		component: About,
		meta: { requiresAuth: false }
	},
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
	},
	{
		path: '/quotation',
		name: "quotation",
		component: Quotation,
		meta: { requiresAuth: false }
	},
	{
		path: '/check-available',
		name: "checkAvailable",
		component: CheckAvailable,
		meta: { requiresAuth: false }
	},
	{
		path: '/reservation',
		name: "reservation",
		component: Reservation,
		meta: { requiresAuth: true }
	},
	{
		path: '/adminUI',
		name: "adminUI",
		component: AdminUI,
		meta: { requiresAuth: true }
	},
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
		alert("Your session expire, please sign in again");
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

	return { name: "homePublic" };
})

export default router
