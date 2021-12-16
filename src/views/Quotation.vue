<template>
    <div class="signUpUser">

        <div>
            <el-form ref="form" :model="formModel"  size="large">               
                <el-alert v-if="showError" :title="error" type="error" show-icon> </el-alert>
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
                    <el-button type="primary" v-on:click="processQuote">Consult</el-button>
                    <el-button type="danger" v-on:click="returnHome">Cancel</el-button>
                </el-form-item>

                <Modal
                :modalIsShow="modalIsShow"
                v-on:close_modal="handleAddModal"
                v-on:reserve="returnLogin"
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
            error: undefined,
            showError: false,     
		};
	},

    components: {
        Modal,
    },

    computed:{
        ...mapGetters(["parkinglots", "detailQuoteState", "detailQuote"]),

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
                this.error = this.err[0];
                this.delayedGreeting();
                return;
            }

            if (this.detailQuote != null)                
                this.handleAddModal(true);
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
        returnLogin () {
    this.$emit("loadLogIn");
        }
    },
    async mounted() {
        await this.$store.dispatch("getParkinglots");
        this.formModel.parkingLots = this.parkinglots;
    },
};
</script>

<style scoped>

    .signUpUser{
        margin: 0;
        padding: 0%;
        height: 660px;
        width: 80%;
        display: flex;
        justify-content:center;
        align-items: right;
        background-color: #141826;
		background-image: url("../assets/Quotation.jpg");
		background-repeat: no-repeat;
		background-size: cover;
    }
  
    .signUpUser form{
        width: 80%;
        padding-top: 30%;
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
        background: #268c79;
        border: 1px solid #E5E7E9;
        padding: 5px;
    }
    .signUpUser button:hover{
        color: #141826;
        background: #35f2bd; 
    }
    form{
        padding-left: 75%;
        text-align: left;
    }
    .el-date-picker{
        background: #35f2bd;
    }
  
</style>