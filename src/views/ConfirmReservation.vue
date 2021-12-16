<template>
    
    <div class="reservation">
        
        <div class="containereserv">
            <el-steps :active="active" finish-status="success">
                <el-step title="Confirm"></el-step>
                <el-step title="Add your plate"></el-step>
                <el-step title="DONE"></el-step>
            </el-steps>

            <el-form ref="form" :model="formModel"  size="medium">
                <el-alert v-if="showError" :title="error" type="error" show-icon> </el-alert>
                <el-alert v-if="showMessage" :title="message" type="success" show-icon> </el-alert>

                <el-form-item  label="">
                    {{ this.formModel.message }}
                </el-form-item>

                <el-form-item size="large">
                    <el-button v-if="pending" type="primary" v-on:click="prevStepone">Previous</el-button>
                    <el-button v-if="pending" type="primary" v-on:click="processReserve">Reserve</el-button>
                    <el-button v-if="!pending" type="primary" v-on:click="returnHome">Home</el-button>
                </el-form-item>
    
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ref } from 'vue'

export default {
    name: "ConfirmReservation",

    data: function () {
        return {
            formModel: {                
                quotation: {
                    clientId        : '',
                    estimatedTime   : ref(1),
                    parkingLot      : '',
                    entryTime       : {
                        newDate: '',
                        newHour: '',
                    },
                },
                message: '',
            },
            active: 0,
            error: undefined,
            message: '',
            showError: false,           
            showMessage: false,
            pending: true,
        };
    },

    computed: {
        ...mapGetters(["detailQuote","detailQuoteState", "userDetailById", "err", "reserve"]),
    },

    methods: {
        processReserve: async function() {
            console.log(this.detailQuote);
            console.log(this.userDetailById);

            const reservationInput = {
                clientId: this.userDetailById.username,
                parkingLot: this.detailQuoteState.parkingLot,
                vehicleType: this.detailQuoteState.vehicleType,
                entryTime: this.detailQuoteState.entryTime,
                estimatedTime: this.detailQuoteState.estimatedTime,
                vehiclePlate: this.detailQuoteState.vehicleType,
            }

            await this.$store.dispatch("createReserve", reservationInput);

            if (this.err != null) {
                this.error = this.err[0].body.detail;
                this.delayedGreeting();
                return;
            }

            this.active = 3;
            this.message = this.reserve.reservation;
            this.delayedGreetingSuccess();
            this.pending = false;
            //this.$emit("loadHome");
        },
        prevStepone () {
            this.active = 2;
            this.$emit("loadReservation");
        },
        returnHome () {
            this.$emit("loadHomePublic");
        }, 
        mysleep: function (ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        delayedGreeting: async function () {
            this.showError = true;
            await this.mysleep(4000);
            this.showError = false;
        },
        delayedGreetingSuccess: async function () {
            this.showMessage = true;
            await this.mysleep(4000);
            this.showMessage = false;
        },      
        parseDate(inputDate) {
            return {
                newDate: (new Date(inputDate).toLocaleString("es-Es", {timeZone: "America/Bogota"})).split(',')[0],
                newHour: (new Date(inputDate).toLocaleString("es-Es", {timeZone: "America/Bogota"})).split(',')[1],
            };
        },
    },

    async mounted() {
        let date = this.parseDate(this.detailQuoteState.entryTime);

        this.formModel.message = `Successful reservation.\n\n
                                  Hi ${ this.detailQuoteState.clientId }\n
                                  Parking place: ${ this.detailQuoteState.parkingLot }\n
                                  Vehicle type: ${ this.detailQuoteState.vehicleType }\n
                                  Vehicle plate: ${ this.detailQuoteState.vehiclePlate }\n
                                  day: ${ date.newDate }\n
                                  hour: ${ date.newHour }\n
                                  price: $${ this.detailQuoteState.price } COP\n`;

        this.active = 1;
        this.active = 2;
    },     
}
</script>

<style scoped>
.reservation{
    margin: 0;
    padding: 0%;
    height: 660px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #141826;
    background-image: url("../assets/BGD2.jpg");
    background-repeat: no-repeat;
    background-size: cover;
}
.containereserv{
    width: 50%;
    padding: 3%;
    color: #e9f3f2;
    background-color: #141826;
    border-radius: 10px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 40px;
}
.reservation button{
    width: 40%;
    height: 40px;
    color: #E5E7E9;
    background: #283747;
    border: 1px solid #E5E7E9;
    border-radius: 5px;
    padding: 5px;
}
.reservation button:hover{
    color: #141826;
    background: #268c79;
}
.el-steps{
        line-height: 16px;
        text-align: center;
        padding: 3% 3% 10% 3%;      
}
</style>