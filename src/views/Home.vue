<template>
	<body>
		<table width="100%" align="center">
			<el-alert v-if="showError" :title="error" type="error" show-icon> </el-alert>
			<tr>
				<td>
				<br />
				<br />
				<br />
				<br />
				<br />
				</td>
			</tr>
		</table>
	</body>
</template>

<script>
import jwt_decode from "jwt-decode";
import { mapGetters } from "vuex";

export default {
	name: "Home",

	data: function () {
		return {
			user: {
				username: "",
				name: "",
				email: "",
			},
			error: undefined,
			showError: false,	  
		};
	},
	computed: {
		...mapGetters(["userDetailById", "err"]),
	},

	methods: {
        mysleep: function (ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        delayedGreeting: async function () {
            this.showError = true;
            await this.mysleep(4000);
            this.showError = false;
        },
	},
	async beforeCreate() {
		let userId = jwt_decode(localStorage.getItem("token_refresh")).user_id;
		await this.$store.dispatch("detailInfo", userId);

		if (this.err != null) {
			this.error = this.err[0].body.detail;
			this.delayedGreeting();
		}
	},
};
</script>

<style >
	table {
		background-color: #141826;
		background-image: url("../assets/BGD2.jpg");
		padding: 0px;
		margin: 0%;
	}
	body {
		padding: 0px;
		margin: 0%;
	}
	a {
		font-size: 50px;
		color: aliceblue;
	}
</style>
