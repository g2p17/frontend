<template>
    <div class="signUpUser">



        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <div class="containerSignUpUser">
            <h2>Reserve</h2>

            <form v-on:submit.prevent="processReserve" >
                <input type="text" v-model="aditionalInfoReserve.vehicleType" placeholder="Vehicle type">
                <br>
                <input type="text" v-model="aditionalInfoReserve.vehiclePlate" placeholder="Vehicle Plate">
                <br>
                <button type="submit">Reserve</button>
            </form>

        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Reservation",

    data: function () {
        return {
            aditionalInfoReserve: {
                vehiclePlate    : "",
                vehicleType     : "",
            },

        };
    },

    computed: {
        ...mapGetters(["detailQuote", "userDetailById"]),
    },

	methods: {
        processReserve: async function() {
            console.log("detailQuote");
            console.log(this.detailQuote);
            console.log(this.userDetailById);
            let reserve = {
                vehiclePlate: this.aditionalInfoReserve.vehiclePlate,
                vehicleType: this.aditionalInfoReserve.vehicleType,
                clientId: this.userDetailById.username,
                estimatedTime: this.detailQuote.estimatedTime,
                parkingLot: this.detailQuote.parkingLot,
                entryTime: this.detailQuote.entryTime,
            }

            await this.$store.dispatch("createReserve", reserve);
            this.$emit("loadHome");
        },
    }    
    

}
</script>

<style scoped>

    .signUpUser{
        margin: 0;
        padding: 0%;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .containerSignUpUser {
        border: 3px solid #283747;
        border-radius: 10px;
        width: 25%;
        height: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .signUpUser h2{
        color: #283747;
    }
    .signUpUser form{
        width: 70%;
    }
    .signUpUser input{
        height: 40px;
        width: 100%;
        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0;
        border: 1px solid #283747;
    }
    .signUpUser button{
        width: 100%;
        height: 40px;
        color: #E5E7E9;
        background: #283747;
        border: 1px solid #E5E7E9;
        border-radius: 5px;
        padding: 10px 25px;
        margin: 5px 0 25px 0;
    }
    .signUpUser button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }
</style>