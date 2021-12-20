<template>

    <div class="reservation">
        <div class="containereserv">

            <el-form 
            ref="formModel" 
            :model="formModel"
            :rules="rules"
            size="medium"
            >                
                <el-steps :active="active" finish-status="success">
                    <el-step title="Your data"></el-step>
                    <el-step title="Add your plate"></el-step>
                    <el-step title="Reservation done"></el-step>
                </el-steps>

                <el-form-item  label="">
                    {{ this.formModel.message }}
                </el-form-item>

                <el-form-item lable="Vehicle type" prop="quotation.vehicleType">
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

                <el-form-item lable="Vehicle plate" prop="quotation.vehiclePlate">
                    <el-input  v-model="formModel.quotation.vehiclePlate"
                        placeholder="Your type vehicle Plate"
                    clearable/>
                </el-form-item>

                <el-form-item size="large">
                    <el-button type="primary" v-on:click="prevStepone">Previous</el-button>
                    <el-button type="primary" v-on:click="submitForm('formModel')">Next</el-button>
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
            rules: {
                quotation: {                
                    vehicleType:  [
                        {
                            required: true,
                            message: 'Please select your vehicle type',
                            trigger: 'change',
                        },
                    ],
                    vehiclePlate: [
                        {
                            required: true,
                            message: 'Please input vehicle plate',
                            trigger: 'blur',
                        },
                        {
                            min: 6,
                            max: 20,
                            message: 'Length should be 6 to 20',
                            trigger: 'blur',
                        },
                    ],
                },
            },            
            active: 0,
        };
    },

    computed: {
        ...mapGetters(["detailQuote", "detailQuote", "detailQuoteState" ,"userDetailById"]),
    },

	methods: {
        parseDate(inputDate) {
            return {
                newDate: (new Date(inputDate).toLocaleString("es-Es", {timeZone: "America/Bogota"})).split(',')[0],
                newHour: (new Date(inputDate).toLocaleString("es-Es", {timeZone: "America/Bogota"})).split(',')[1],
            };
        },
        nextSteptwo () {
            /*
            this.detailQuote.vehiclePlate = this.formModel.quotation.vehiclePlate;
            this.detailQuote.vehicleType = this.formModel.quotation.vehicleType;
            */

            const tempReserve = {
                clientId: this.userDetailById.username,
                estimatedTime: this.detailQuoteState.estimatedTime,
                parkingLot: this.detailQuoteState.parkingLot,
                entryTime: this.detailQuoteState.entryTime,
                price: this.detailQuote.price,
                date1: this.detailQuoteState.date1,
                date2: this.detailQuoteState.date2, 
                vehiclePlate: this.formModel.quotation.vehiclePlate.toUpperCase(),
                vehicleType: this.formModel.quotation.vehicleType,
            }

            this.$store.dispatch("updateDetailQuoteState", tempReserve);
            this.active = 2;
            this.$emit("loadConfirmReservation");
        },
        prevStepone () {
            this.active = 1;
            this.$emit("loadQuotationm");
        },
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					//alert('submit!')
					this.nextSteptwo();
				} else {
					//console.log('error submit!!')
					return false
				}
			})
		},
		resetForm(formName) {
			this.$refs[formName].resetFields()
            this.returnHome();
		},        
    },
    async mounted() {

        const tempReserve = {
            clientId: this.userDetailById.username,
            estimatedTime: this.detailQuoteState.estimatedTime,
            parkingLot: this.detailQuoteState.parkingLot,
            entryTime: this.detailQuoteState.entryTime,
            price: this.detailQuote.price,
            vehiclePlate: this.detailQuoteState.vehiclePlate,
            vehicleType: this.detailQuoteState.vehicleType,            
        }

        let date = this.parseDate(tempReserve.entryTime);

        this.formModel.message = `Reservation in progress.\n\n
                                  Hi ${ tempReserve.clientId }\n
                                  Parking place: ${ tempReserve.parkingLot }\n
                                  day: ${ date.newDate }\n
                                  hour: ${ date.newHour }\n
                                  price: $${ tempReserve.price } COP\n`;

        this.formModel.quotation = tempReserve;

        this.active = 1;
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