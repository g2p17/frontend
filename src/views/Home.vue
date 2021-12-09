<template>
	<body>
    <table width="100%" bgcolor=#35f2bd align=center>
	<tr>
	<td> <a style="color:#35f2bd">Find parking from the ease of your home.</a>
        <br>
        <router-link to="/" > Check our availability here </router-link>
				<br>
				<br>
				<br>
				<br>
    </td>
	</tr>
	</table>
</body>
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

<style >
table {
  background-color: #141826;
  background-image: url("../assets/123.jpg");
  padding: 0px;
  margin: 0%;
  
}
body{
  padding: 0px;
  margin: 0%
}
a{
  font-size: 50px;
  color: aliceblue;
}
</style>
