<template>
    <div>
        <el-form 
        ref="formModel"
        :model="formModel"  
        :rules="rules"
        size="medium"
        >
            <el-alert v-if="showError" :title="error" type="error" show-icon> </el-alert>
            
            <el-form-item prop="quotation.parkingPlace">
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
            
            <el-form-item size="large">
                <el-button type="primary" v-on:click="submitForm('formModel')">Confirm</el-button>
                <el-button type="danger" v-on:click="resetForm('formModel')">Clear</el-button>
            </el-form-item>

        </el-form> 

        <el-table
        :data="reservationsByParkinglot.filter(
        (data) =>
          !search || data.vehiclePlate.toLowerCase().includes(search.toLowerCase())
        )" 
        max-height="400"
        :row-style="{height: '20px'}"
        :cell-style="{'font-size': '14px', color: 'black'}"
        :header-row-style="{'font-size': '18px', padding: '10px'}"
        style="width: 80%"   
        >
            <el-table-column type="index" width="50" />
            <el-table-column prop="vehiclePlate" label="Vehicle plate" width="150" />
            <el-table-column prop="vehicleType" label="Vehicle type" width="150" />
            <el-table-column prop="entryTime" label="Entry Time" width="220" />
            <el-table-column prop="estimatedTime" label="Estimated time" width="150" />

        </el-table>

    </div>    
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: 'AdminReservations',
    
    data() {
		return {
            formModel: {                
                parkingLots: [],
                hola:'s',
                quotation: {
                    parkingPlace: '',
                },
            },
			rules: {
                quotation: {                
                    parkingPlace: [
                        {
                            required: true,
                            message: 'Please select your zone',
                            trigger: 'change',
                        },
                    ],
                },
            },
            search: '',                      
            error: undefined,
            showError: false,
		};
    },  

    computed: {
        ...mapGetters(["reservationsByParkinglot", "parkinglotsByadmin", "err", "userDetailById"]),
    },

    methods: {
        modifiedTime(entryTime) {
            return this.parseDate(entryTime);
        },
        parseDate(inputDate) {
            return {
                newDate: (new Date(inputDate).toLocaleString("es-Es", {timeZone: "America/Bogota"})).split(',')[0],
                newHour: (new Date(inputDate).toLocaleString("es-Es", {timeZone: "America/Bogota"})).split(',')[1],
            };
        },        
        showReservations: async function() {
            console.log(this.formModel.quotation.parkingPlace);
            await this.$store.dispatch("getParkingLotByParkinglot", this.formModel.quotation.parkingPlace);
        },
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					//alert('submit!')
					this.showReservations();
				} else {
					//console.log('error submit!!')
					return false
				}
			})
		},
		resetForm(formName) {
			this.$refs[formName].resetFields()
            //this.returnHome();
		},        
    },
    
    async mounted() {
        await this.$store.dispatch("getParkinglotsByAdmin", this.userDetailById.identity_document);

        if (this.parkinglotsByadmin)
            this.formModel.parkingLots = this.parkinglotsByadmin;
    },
}
</script>

<style scoped>

</style>