<template>
	<div class="information">
		<!-- <h1><span>{{ user.name }}</span>!</h1> -->
		<h1><span>{{ userDetailById.name }}</span>!</h1>
		
	</div>
</template>


<script>
import jwt_decode 					from "jwt-decode";
import { mapGetters } 				from "vuex";

export default {
	name: "Home",

	data: function () {
		return {
			user			: {
				username	: "",
				name		: "",
				email		: "",
			},			
		};
	},
	computed:{
		...mapGetters(["userDetailById"]),
	},
	async beforeCreate () {
		let userId = jwt_decode(localStorage.getItem("token_refresh")).user_id
		await this.$store.dispatch("detailInfo", userId);
	},
};
</script>
