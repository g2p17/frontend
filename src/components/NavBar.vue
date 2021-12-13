<template>
	<div class="header">
		<router-link to="/">  
			<img 
			alt="ParkingWeb logo" 
			href="/" 
			align="left" 
			src="../assets/logotipo2.png" 
			>
		</router-link>
		<nav align="right">
			<button v-if="!isauth" v-on:click="loadHomem">HOME</button>
			<button v-if="!isauth" v-on:click="loadAboutm">ABOUT</button>
			<button v-if="!isauth" v-on:click="loadQuotationm">QUOTE</button>
			<button v-if="!isauth" v-on:click="loadLogInm">LOGIN</button>			
			<button v-if="!isauth" v-on:click="loadSignUpm">SIGN</button>
			<button v-if="isauth" v-on:click="loadReservation">BOOK</button>
			<button v-if="isauth" v-on:click="logOutm">LOGOUT</button>
		</nav>
	</div> 
</template>

<script>
export default {
    name: 'NavBar',
	props: {
		isauth: undefined
	},
	methods: {
		loadHomem() {
			this.$emit("loadHome")
		},
		logOutm() {
			this.$emit("logOut")
		},
		loadLogInm() {
			this.$emit("loadLogIn")
		},
		loadSignUpm() {
			this.$emit("loadSignUp")
		},
		loadReservation() {
			this.$emit("loadReservation")
		},
		loadAboutm() {
			this.$emit("loadAbout")
		},
		loadQuotationm() {
			this.$emit("loadQuotation")
		},
				
	}
}
</script>

<style scoped>
	.header{
		background-color: #141826;
		margin: 0;
		padding: 0;
		width: 100%;
	}
	.header nav {
		margin: 0;
		padding: 0;
		font-size: 20px;
		text-align: end;
	}
	.header img {
		vertical-align: middle;
		margin:10px 10px;
		width: 202px;
		height: 40px;
	}
	.header nav button{
		
		color: #e9f3f2;
		background: #141826;
		border-radius: 6px;
		border: 0px;
		width: 9%;
		padding: 15px 30px 15px 30px;
		margin: 1px;
		text-align: center;
	}
	.header nav button:hover{
		color: #141826;
		background: #268c79;
	}
</style>