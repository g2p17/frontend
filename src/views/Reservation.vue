<template>

    <div class="reservation">
        <div class="containereserv">

            <el-steps :active="active" finish-status="success">
                <el-step title="Your data"></el-step>
                <el-step title="Processing"></el-step>
                <el-step title="Reservation done"></el-step>
            </el-steps>

            <el-form ref="form" :model="formModel"  size="medium">

                <el-form-item  label="">
                    {{ this.formModel.message }}
                </el-form-item>

                <el-form-item lable="Vehicle type">
                    <el-select
                    v-model="formModel.quotation.vehicleType"
                    placeholder="Your type vehicle type"
                    size="medium"
                    >
                        <el-option 
                        v-for="(vehicleType, ind) in formModel.vehicleTypes" :key="ind"
                        :label="vehicleType" :value="vehicleType"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item lable="Vehicle plate">
                    <el-input  v-model="formModel.quotation.vehiclePlate"
                        placeholder="Your type vehicle Plate"
                    clearable/>
                </el-form-item>

                <el-form-item size="large">
                    <el-button type="primary" v-on:click="nextSteptwo">Reserve</el-button>
                </el-form-item>
    
            </el-form>
        </div>
    </div>

</template>

<script>
import { mapGetters } from "vuex";
import { ref } from 'vue'

export default {
    name: "Reservation",

    data: function () {
        return {
            formModel: {                
                vehicleTypes : [
                    "Car",
                    "Motorcycle",
                    "Bicycle",
                    "Disabled Parking",
                ],
                parkingLots: [],
                quotation: {
                    clientId        : '',
                    estimatedTime   : ref(1),
                    parkingLot      : '',
                    price           : '',
                    entryTime       : {
                        newDate: '',
                        newHour: '',
                    },
                    vehiclePlate    : '',
                    vehicleType     : '',
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
        parseDate(inputDate) {
            return {
                newDate: (new Date(inputDate).toLocaleString("es-Es", {timeZone: "America/Bogota"})).split(',')[0],
                newHour: (new Date(inputDate).toLocaleString("es-Es", {timeZone: "America/Bogota"})).split(',')[1],
            };
        },
        nextSteptwo () {
            this.detailQuote.vehiclePlate = this.formModel.quotation.vehiclePlate;
            this.detailQuote.vehicleType = this.formModel.quotation.vehicleType;

            const tempReserve = {
                clientId: this.userDetailById.username,
                estimatedTime: this.detailQuote.estimatedTime,
                parkingLot: this.detailQuote.parkingLot,
                entryTime: this.detailQuote.entryTime,
                price: this.detailQuote.price,
                vehiclePlate: this.formModel.quotation.vehiclePlate,
                vehicleType: this.formModel.quotation.vehicleType,
            }

            this.$store.dispatch("updateDetailQuote", tempReserve);
            this.active = 2;
            this.$emit("loadConfirmReservation");
        },
    },
    async mounted() {

        const tempReserve = {
            clientId: this.userDetailById.username,
            estimatedTime: this.detailQuote.estimatedTime,
            parkingLot: this.detailQuote.parkingLot,
            entryTime: this.detailQuote.entryTime,
            price: this.detailQuote.price,
            vehiclePlate: '',
            vehicleType: '',            
        }

        let date = this.parseDate(tempReserve.entryTime);

        this.formModel.message = `Reservación en progreso.\n\n
                                  Hola ${ tempReserve.clientId }\n
                                  Parking place: ${ tempReserve.parkingLot }\n
                                  día: ${ date.newDate }\n
                                  Hora: ${ date.newHour }\n
                                  Precio: $${ tempReserve.price } COP\n`;

        this.formModel.quotation = tempReserve;

        this.active = 1;
    },  
    

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