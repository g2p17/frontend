<template>
  <div class="adminUI">
    <table class="admintable"> 
        <div>
            <router-link to="/admin/parkinglots"><button>Parking Lots</button></router-link>
            <router-link to="/quotation"><button>Customers</button></router-link>
            <router-link to="/quotation"><button>Reservations</button></router-link>
        </div>
    </table>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import { mapGetters } from "vuex";

export default {
	name: 'adminUI',
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

		if (this.err) {
			console.log(this.err);
			this.delayedGreeting();
		}
	},  

}

</script>


<style scoped>

.adminUI{
	padding: 0%;
	margin: 0%;
}
.admintable{
	padding: 0%;
	margin: 0%;
	background-color: #141826;
	background-image: url("../assets/Adm.jpg");
	width: 100%;
	height:1600px;
	background-size: cover;
    text-align: center;
}
</style>