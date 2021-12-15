<template>
    
    <div class="reservation">
        <el-alert v-if="showError" :title="error" type="error" show-icon> </el-alert>
        <el-alert v-if="showMessage" :title="message" type="success" show-icon> </el-alert>
        <div class="containereserv">
            <el-steps :active="active" finish-status="success">
                <el-step title="Step 1"></el-step>
                <el-step title="Step 2"></el-step>
                <el-step title="Step 3"></el-step>
            </el-steps>

            <el-form ref="form" :model="formModel"  size="medium">

                <el-form-item  label="">
                    {{ this.formModel.message }}
                </el-form-item>

                <el-form-item size="large">
                    <el-button v-if="pending" type="primary" v-on:click="processReserve">Reserve</el-button>
                    <el-button v-if="pending" type="primary" v-on:click="prevStepone">Previous</el-button>
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

        this.formModel.message = `Reservación en progreso.\n\n
                                  Hola ${ this.detailQuoteState.clientId }\n
                                  Parking place: ${ this.detailQuoteState.parkingLot }\n
                                  Vehicle type: ${ this.detailQuoteState.vehicleType }\n
                                  Vehicle plate: ${ this.detailQuoteState.vehiclePlate }\n
                                  día: ${ date.newDate }\n
                                  Hora: ${ date.newHour }\n
                                  Precio: $${ this.detailQuoteState.price } COP\n`;

        this.active = 1;
        this.active = 2;
    },  
    
}
</script>