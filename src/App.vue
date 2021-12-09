<template>
	<div>
		<div class="header">
			<nav>
				<button v-if="is_auth" v-on:click="loadHome">Inicio</button>
				<button v-if="is_auth" v-on:click="logOut">Cerrar Sesión</button>
				<button v-if="!is_auth" v-on:click="loadLogIn">Iniciar Sesión</button>
				<button v-if="!is_auth" v-on:click="loadSignUp">Registrarse</button>
			</nav>
		</div>

		<div class="main-component">
			<router-view
				v-on:completedLogIn="completedLogIn"
				v-on:completedSignUp="completedSignUp"
				v-on:logOut="logOut"
			>
			</router-view>
		</div>
	</div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>


<script>
import { mapGetters } 				from "vuex";

export default {
	
	name: "App",

	computed: {
		...mapGetters(["sessionInfo"]),
		is_auth: {
			get: function () {
				return this.$route.meta.requiresAuth;
			},
			set: function () {},
		},
	},

	methods: {
		loadLogIn: function () {
			this.$router.push({ name: "logIn" });
		},

		loadSignUp: function () {
			this.$router.push({ name: "signUp" });
		},

		completedLogIn: function () {
			localStorage.setItem("username", this.sessionInfo.username);
			localStorage.setItem("token_access", this.sessionInfo.tokenAccess);
			localStorage.setItem("token_refresh", this.sessionInfo.tokenRefresh);
			alert("Autenticación Exitosa");
			this.loadHome();
		},

		completedSignUp: function (data) {
			alert("Registro Exitoso");
			this.completedLogIn(data);
		},

		loadHome: function () {
			this.$router.push({ name: "home" });
		},

		loadAccount: function () {
			this.$router.push({ name: "account" });
		},

		loadTransaction: function () {
			this.$router.push({ name: "transaction" });
		},

		logOut: function () {
			localStorage.clear();
			alert("Sesión Cerrada");
			this.loadLogIn();
		},
	},
};
</script>