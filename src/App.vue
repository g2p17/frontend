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
				v-on:loadReservation="loadReservation"
				v-on:loadAbout="loadAboutm"
				v-on:loadQuotation="loadQuotationm"
				/>
			</el-header>
			<el-main>		
				<router-view
					v-on:loadLogIn="loadLogIn"
					v-on:completedLogIn="completedLogIn"
					v-on:completedSignUp="completedSignUp"
					v-on:logOut="logOut"
					v-on:completedQuotation="completedQuotation"
					v-on:loadHomePublic="loadHomePublic"
					v-on:loadSignUp="loadSignUp"
					v-on:loadReservation="loadReservation"
					v-on:loadConfirmReservation="loadConfirmReservation"
					v-on:loadQuotationm="loadQuotationm"
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

		loadReservation: function () {
			this.$router.push({ name: "reservation" });
		},

		loadAboutm: function(){
			this.$router.push ({name:"about"})
		},

		loadQuotationm: function(){
			this.$router.push ({ name: "quotationUser" })
		},

		loadConfirmReservation: function() {
			this.$router.push ({ name: "confirmReserve" })
		},

		logOut: function () {
			localStorage.clear();
			//this.$store.dispatch("updateDetailQuote", undefined);
			this.$store.dispatch("updateDetailQuote", '');
      this.$store.dispatch("updateDetailQuoteState", '');

			//this.$store.replaceState({});
			alert("Closed session");
			this.loadLogIn();
		},		

		completedLogIn: function () {
			if (this.sessionInfo == null) {
				alert("Authentication failed");	
				return
			}

			localStorage.setItem("username", this.sessionInfo.username);
			localStorage.setItem("token_access", this.sessionInfo.tokenAccess);
			localStorage.setItem("token_refresh", this.sessionInfo.tokenRefresh);
			alert("Successful Authentication");
			this.loadHome();
		},

		completedSignUp: function (data) {
			alert("Successful registration");
			this.completedLogIn(data);
		},

		completedQuotation: function(){
			alert("Quotation processing");
			this.loadCheckAvailable();
		},
	},
};
</script>



<style scoped>
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
		
		line-height: 160px;
		margin: 0px;
		padding: 0px;
	}

	body > .el-container {
		margin-bottom: 40px;
	}
</style>