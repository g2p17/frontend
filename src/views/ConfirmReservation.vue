<template>
    
    <div class="reservation">
        <div class="containereserv">

            <el-steps :active="active" finish-status="success">
                <el-step title="confirm"></el-step>
                <el-step title="Step 2"></el-step>
                <el-step title="Step 3"></el-step>
            </el-steps>

            <el-form ref="form" :model="formModel"  size="medium">

                <el-form-item  label="">
                    {{ this.formModel.message }}
                </el-form-item>

                <el-form-item size="large">
                    <el-button type="primary" v-on:click="processReserve">Reserve</el-button>
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
        };
    },

    computed: {
        ...mapGetters(["detailQuote", "userDetailById"]),
    },

    methods: {
        processReserve: async function() {
            console.log(this.detailQuote);
            console.log(this.userDetailById);

            const reservationInput = {
                clientId: this.userDetailById.username,
                parkingLot: this.detailQuote.parkingLot,
                vehicleType: this.detailQuote.vehicleType,
                entryTime: this.detailQuote.entryTime,
                estimatedTime: this.detailQuote.estimatedTime,
                vehiclePlate: this.detailQuote.vehicleType,
            }

            await this.$store.dispatch("createReserve", reservationInput);
            this.active = 3;
            //this.$emit("loadHome");
        },
        parseDate(inputDate) {
            return {
                newDate: (new Date(inputDate).toLocaleString("es-Es", {timeZone: "America/Bogota"})).split(',')[0],
                newHour: (new Date(inputDate).toLocaleString("es-Es", {timeZone: "America/Bogota"})).split(',')[1],
            };
        },
    },

    async mounted() {
        let date = this.parseDate(this.detailQuote.entryTime);

        this.formModel.message = `Reservación en progreso.\n\n
                                  Hola ${ this.detailQuote.clientId }\n
                                  Parking place: ${ this.detailQuote.parkingLot }\n
                                  Vehicle type: ${ this.detailQuote.vehicleType }\n
                                  Vehicle plate: ${ this.detailQuote.vehiclePlate }\n
                                  día: ${ date.newDate }\n
                                  Hora: ${ date.newHour }\n
                                  Precio: $${ this.detailQuote.price } COP\n`;

        this.active = 1;
        this.active = 2;
    },  
    
}
</script>