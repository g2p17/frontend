<template>
	<body>
		<table width="100%" align="center">
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
    };
  },
  computed: {
    ...mapGetters(["userDetailById"]),
  },
  async beforeCreate() {
    let userId = jwt_decode(localStorage.getItem("token_refresh")).user_id;
    await this.$store.dispatch("detailInfo", userId);
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
