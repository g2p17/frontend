<template>
    <div class="signUpUser">
        <div class="containerSignUpUser">
            <h2>Registrarse</h2>
            <form v-on:submit.prevent="processQuote" >
                <input type="text" v-model="quotation.parkingLot" placeholder="Parking place">
                <br>
                <input type="text" v-model="quotation.vehicleType" placeholder="Vehicle type">
                <br>
                <input type="entryTime" v-model="quotation.entryTime" placeholder="Entry time">
                <br>
                <input type="number" v-model="quotation.estimatedTime" placeholder="Estimated time">
                <br>
                <button type="submit">Search</button>
            </form>
        </div>  

        <el-form ref="form" :model="sizeForm" size="large">        
        <el-form-item >
        <el-select
            v-model="sizeForm.region"
            placeholder="Please select your zone"
            size="medium"
            >
            <el-option label="Zone one" value="shanghai"></el-option>
            <el-option label="Zone two" value="beijing"></el-option>
        </el-select>
        </el-form-item>

        <el-form-item >
            <el-select
                v-model="sizeForm.typeVehicle"
                placeholder="Your type vehicle"
                size="medium"
                        >
                    <el-option label="Car" value="Car"></el-option>
                    <el-option label="Motorcycle" value="Motorcycle"></el-option>
                    <el-option label="Bicycle" value="Bicycle"></el-option>
                    <el-option label="Reduced mobility" value="Reduced mobility"></el-option>
                </el-select>        
        </el-form-item>

        <el-form-item >
        <el-col :span="11">
            <el-date-picker
                v-model="sizeForm.date1"
                type="date"
                placeholder="Pick a date"
                style="width: 100%"
                background-color= #141826;
            ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
            <el-time-picker
                v-model="sizeForm.date2"
                placeholder="Pick a time"           
            ></el-time-picker>
        </el-col>
        </el-form-item>

        <el-form-item >
            <el-input v-model="sizeForm.estimated"
                placeholder="Estimated time in minutes"
                style="padding: 0px 30px 0px 0px;"
            ></el-input>
        </el-form-item>
                
        <el-form-item size="large">
            <el-col :span="10" :offset="2">
                <el-button type="submit" @click="onSubmit">Quote</el-button>
            </el-col>
            <el-col :span="10">
                <router-link to="/"><el-button>Cancel</el-button></router-link>
            </el-col>
        </el-form-item>

    </el-form>
    </div>
</template>

<script>
export default {
  name: "Quotation",
	data() {
		return {
			quotation: {
				parkingLot : "ParkElEden",
				vehicleType : "Motorcycle",
				entryTime : "2022-13-09T07:00:00.405Z",
				estimatedTime : 120
			},
            sizeForm: {                
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                estimated: '',                
                //a que se refiere este delivery
                desc: '',
            },
		};
	},
	methods: {
        processQuote: async function() {
            await this.$store.dispatch("searchParkingLot", this.quotation);
            this.$emit("completedQuotation");
        },
        onSubmit() {
      console.log('submit!')
        }
    }
};
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
        color: #141826;
        background: #268c79;
        
    }
    form{
        background-color: #141826;
		background-image: url("../assets/Quotation.jpg");
		background-repeat: no-repeat;
		background-size: cover;
        padding: 2% 5% 2% 15%;
        text-align: left;
    } 
    .el-date-picker{
        background: #99a9bf;
    }   
    .sizeForm el-button:hover{
		color: #141826;
		background: #268c79;
	}
</style>