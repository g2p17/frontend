<template>
    <div class="signUpUser">

        <div>
            <el-form ref="form" :model="formModel"  size="medium">               
                <el-alert v-if="showError" :title="error" type="error" show-icon> </el-alert>
                <el-steps :active="active" finish-status="success">
                    <el-step title="Confirm data"></el-step>
                    <el-step title="Add your plate"></el-step>
                    <el-step title="Reservation"></el-step>
                </el-steps>

                <el-form-item>
                    <el-select
                    v-model="formModel.quotation.parkingPlace"                    
                    placeholder="Please select your zone"
                    size="medium"
                    >
                        <el-option 
                        v-for="(parkinglot, ind) in formModel.parkingLots" :key="ind"
                        :label="parkinglot.parking_place" :value="parkinglot.parking_place"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-select
                    v-model="formModel.quotation.vehicleType"
                    placeholder="Your type vehicle"
                    size="medium"
                    >
                        <el-option 
                        v-for="(vehicleType, ind) in formModel.vehicleTypes" :key="ind"
                        :label="vehicleType" :value="vehicleType"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-col :span="11">
                        <el-date-picker
                        v-model="formModel.quotation.date1"
                        type="date"
                        placeholder="Pick a date"
                        style="width: 100%"
                        ></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker
                        v-model="formModel.quotation.date2"
                        placeholder="Pick a time"
                        style="width: 100%"
                        ></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item >
                    <el-input-number  v-model="formModel.quotation.estimatedTime" :min="15" :max="1380"
                        placeholder="Estimated time in minutes"
                    ></el-input-number>
                </el-form-item>

                <el-form-item size="large">
                    <el-button type="danger" v-on:click="returnHome">Cancel</el-button>
                    <el-button type="primary" v-on:click="processQuote">Confirm</el-button>
                </el-form-item>

                <Modal
                :modalIsShow="modalIsShow"
                v-on:close_modal="handleAddModal"
                v-on:reserve="returnSignUp"
                />  
            </el-form>
        </div>
    </div>
</template>

<script>
import Modal from '../components/Modal.vue'
import { mapGetters } from "vuex";
import { ref } from 'vue'

export default {
    name: "Quotation",

	data() {
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
                    parkingPlace: '',
                    vehicleType: '',
                    date1: '',
                    date2: '',                    
                    estimatedTime: ref(1),
                },
            },
            modalIsShow: false,
            active: 0,
            error: undefined,
            showError: false,
		};
	},

    components: {
        Modal,
    },

    computed: {
        ...mapGetters(["parkinglots", "detailQuote", "err", "detailQuoteState"]),

    },
	methods: {
        processQuote: async function() {       
            let dateformat = this.formModel.quotation.date1.toString();
            let hourformat = this.formModel.quotation.date2.toISOString();

            let isoDate = this.parseDate(dateformat, hourformat);

            const quotationState = {
                parkingLot : this.formModel.quotation.parkingPlace,
				vehicleType : this.formModel.quotation.vehicleType,
				entryTime : isoDate,
                date1: this.formModel.quotation.date1,
                date2: this.formModel.quotation.date2,
				estimatedTime : this.formModel.quotation.estimatedTime,
            }

            this.$store.dispatch("updateDetailQuoteState", quotationState);

            console.log(this.detailQuoteState);

            const quotation = {
                parkingLot : this.formModel.quotation.parkingPlace,
				vehicleType : this.formModel.quotation.vehicleType,
				entryTime : isoDate,
				estimatedTime : this.formModel.quotation.estimatedTime,
            }

            await this.$store.dispatch("searchParkingLot", quotation);

            if (this.err != null) {
                //this.error = this.err[0].body.detail;
                this.error = this.err[0].body;
                this.delayedGreeting();
                return;
            }
            
            if (this.detailQuote != null) {
                this.handleAddModal(true);
                this.active = 1;
            }               
                
        },
        parseDate(inputDate, inputHour) {
            //console.log(inputDate.split(' ')[2] + " " + inputDate.split(' ')[1] + " " + inputDate.split(' ')[3]);
            let date = inputDate.split(' ')[2] + " " + inputDate.split(' ')[1] + " " + inputDate.split(' ')[3];
            //console.log(inputHour.split(':')[0] + ":" + inputHour.split(':')[1])            
            let midHour = inputHour.split('T')[1].split(':')
            //console.log("hola1 " + h[0] + ":" + h[1]);
            let hour = midHour[0] + ":" + midHour[1];            
            //let hour = inputHour.split('T')[1].split(':');
            console.log(date + " " + hour + " UTC");
            return (new Date(date + " " + hour + " UTC")).toISOString();
        },
        handleAddModal(value) {
            this.modalIsShow = value;
        },        
        returnHome () {
            this.$emit("loadHomePublic");
        },      
        returnSignUp () {
            this.$emit("loadReservation");
        },
        mysleep: function (ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        delayedGreeting: async function () {
            this.showError = true;
            await this.mysleep(4000);
            this.showError = false;
        },     
    },
    async mounted() {
        await this.$store.dispatch("getParkinglots");
        this.formModel.parkingLots = this.parkinglots;

        if (this.detailQuoteState != null) {
           
            const quotation = {
                parkingPlace : this.detailQuoteState.parkingLot,
				vehicleType : this.detailQuoteState.vehicleType,
                date1: this.detailQuoteState.date1,
                date2: this.detailQuoteState.date2,                
				estimatedTime : this.detailQuoteState.estimatedTime,
            }

            if (quotation.estimatedTime == undefined)
                quotation.estimatedTime = 15

            console.log(quotation);
            
            this.formModel.quotation = quotation;
        }
    },
};
</script>

<style scoped>

    .signUpUser{
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
    .containerSignUpUser {
        border: 3px solid #283747;
        width: 25%;
        height: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .signUpUser form{
        width: 70%;
        background-color: #141826;
        border-radius: 10px;
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
        width: 40%;
        height: 40px;
        color: #E5E7E9;
        background: #283747;
        border: 1px solid #E5E7E9;
        border-radius: 5px;
        padding: 5px;
    }
    .signUpUser button:hover{
        color: #141826;
        background: #268c79;    
    }
    form{
        padding: 2% 5% 2% 15%;
        text-align: left;
    }   
    .el-steps{
        line-height: 16px;
        text-align: center;
        padding: 3% 3% 10% 3%;     
    }
    
</style>