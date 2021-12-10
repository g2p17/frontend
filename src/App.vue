<template>
<div id="app">     
	<div class="common-layout">    
		<el-container>
			<el-header>
			<!--<head> <script src="https://kit.fontawesome.com/35e3c3d0df.js" crossorigin="anonymous"></script></head>-->		
				<nav-bar
				:isauth="message"
				v-on:loadHome="loadHome"
				v-on:logOut="logOut"
				v-on:loadLogIn="loadLogIn"
				v-on:loadSignUp="loadSignUp"
				/>
			</el-header>
			<el-main>		
				<router-view
					v-on:completedLogIn="completedLogIn"
					v-on:completedSignUp="completedSignUp"
					v-on:logOut="logOut"
					v-on:completedQuotation="completedQuotation"
					v-on:loadHomePublic="loadHomePublic"
					v-on:loadSignUp="loadSignUp"
				>
				</router-view> 
			</el-main>
			<el-footer>
				<footer-parking />
			</el-footer>
		</el-container>
	</div> 
</div>
</template>



<script>
import	{ mapGetters } 	from "vuex";
import	NavBar 			from '@/components/NavBar.vue'
import	FooterParking 	from '@/components/FooterParking.vue'

export default {	
	name: "App",

	data: function () {
		return {
			message: undefined,
		};
	},

	components: {
		NavBar,
		FooterParking,
	},

	computed: {
		...mapGetters(["sessionInfo"]),
		is_auth: {
			get: function () {
				return this.$route.meta.requiresAuth;
			},
			set: function () {},
		},
	},
	watch: {
        is_auth: function() {
			this.message = this.is_auth;
		} 
	},

	methods: {
		loadLogIn: function () {
			this.$router.push({ name: "logIn" });
		},

		loadSignUp: function () {
			this.$router.push({ name: "signUp" });
		},

		loadCheckAvailable: function () {
			this.$router.push({ name: "checkAvailable" });
		},

		loadHome: function () {
			this.$router.push({ name: "home" });
		},

		loadHomePublic: function () {
			this.$router.push({ name: "homePublic" });
		},		

		logOut: function () {
			localStorage.clear();
			alert("Sesión Cerrada");
			this.loadLogIn();
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

		completedQuotation: function(){
			alert("Cotización en proceso");
			this.loadCheckAvailable();
		},
	},
};
</script>


<style>
	#app {
		font-family: 'Helvetica Neue';
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin: 0;
		padding: 0;
	}

	.el-header,
	.el-footer {
		margin: 0;
		padding: 0px;
		line-height: 60px;
	}
	
	.el-main {
		background-color: #e9eef3;
		color: var(--el-text-color-primary);
		text-align: center;
		line-height: 160px;
		margin: 0px;
		padding: 0px;
	}

	body > .el-container {
		margin-bottom: 40px;
	}
</style>