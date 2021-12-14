<template>
    <div class="reservation">
        <div class="containereserv">
            <el-form
            ref="form" 
            label-width="100px" 
            size="medium"
            v-on:submit.prevent="processReserve"
            ><el-form-item label="Vehicle Type">
                    <el-input 
                    type="text"
                    v-model="aditionalInfoReserve.vehicleType" 
                    placeholder="Vehicle type"
                    ></el-input>
                </el-form-item>    
                <el-form-item label="Vehicle plate">
                    <el-input 
                    type="text" 
                    v-model="aditionalInfoReserve.vehiclePlate" 
                    placeholder="Vehicle plate"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="processReserve">Submit</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--<h2>Reserve</h2>
        <form v-on:submit.prevent="processReserve" >
            <input type="text" v-model="aditionalInfoReserve.vehicleType" placeholder="Vehicle type">
            <br>
            <input type="text" v-model="aditionalInfoReserve.vehicleType" placeholder="Vehicle type">
            <br>
            <button type="submit">Reserve</button>
        </form>-->
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
.reservation{
    margin: 0;
    padding: 0;
    height: 660px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:  #268c79;
    background-image: url("../assets/BGD2.jpg");
    background-repeat: no-repeat;
    background-size: cover;
}
.reservation button{
    width: 50%;
    height: 40px;
    color: #E5E7E9;
    background: #141826;
    border: 1px solid #E5E7E9;
    padding: 10px 30px;
}
.reservation button:hover{
    color: #141826;
    background: #35f2bd; 
}
.containereserv{
    width: 40%;
    padding: 3%;
    background-color: #141826;
    color: #e9f3f2;
}
</style>