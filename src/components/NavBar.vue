<template>
	<div class="header">
		<a 
		href="/" 
		target="_blank" 
		rel="noopener">
			<img 
			alt="ParkingWeb logo" 
			href="https://www.w3schools.com" 
			align="left" 
			src="../assets/logo1.png" 
			>
		</a>
		<nav align="right">
			<button v-if="isauth" v-on:click="loadHome">HOME</button>
			<button v-if="isauth" v-on:click="logOutm">LOGOUT</button>
			<button v-if="!isauth" v-on:click="loadLogInm">LOGIN</button>
			<button v-if="!isauth" v-on:click="loadSignUpm">SIGN</button>
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