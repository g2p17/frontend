<template>
    <div v-show="modalIsShow" class="modal">
        <div class="modal__content">
            <AddForm class="form" aria-describedby="add form" @submit="handleSubmit">
            
                <div><img 
                    alt="ParkingWeb logo"  
                    align="top" 
                    src="../assets/modal.png" 
                ></div>
                <el-form
                ref="productInfo" 
                :model="quotation"
                >
                    <el-form-item  label="">
                        {{ this.message }}
                    </el-form-item>              

                    <el-form-item>          
                        <el-button v-on:click="reserve">Reserve</el-button>
                        <el-button v-on:click="handleSubmit">Cancel</el-button>
                    </el-form-item>

                </el-form>
            </AddForm>
        </div>
    </div>
</template>

<script>
import { Form as AddForm } from "vee-validate";
import { mapGetters } from "vuex";

export default {
    name: "modal-quote",

    data() {
        return {
            message: '',
            quotation:  {
                entryTime   : "",
                parkingLot  : "",
                price       : 0,
                state       : "",
                vehicleType : ""
            }
        };
    },

    props: {
        modalIsShow: {
            type: Boolean,
        },
    },

    components: { 
        AddForm
    },

    computed: {
        ...mapGetters(["detailQuote"]),
    },   
    
	watch: {
        modalIsShow: function() {
            const quotationUp = {
                entryTime: this.parseDate(this.detailQuote.entryTime),
                estimatedTime: this.detailQuote.estimatedTime,
                parkingLot: this.detailQuote.parkingLot,
                price: this.detailQuote.price,
                state: this.detailQuote.state,
                vehicleType: this.detailQuote.vehicleType,
            };
          
            this.message = `With us the parking of your ${ quotationUp.vehicleType.toLowerCase() } in ${ quotationUp.parkingLot } 
                        the day ${ quotationUp.entryTime.newDate } at ${ quotationUp.entryTime.newHour } has a cost of $${ quotationUp.price } COP`;
		} 
	},    

    methods: {
        handleSubmit() {
            this.$emit("close_modal", false);
        },
        
        parseDate(inputDate) {            
            return {
                newDate: (new Date(inputDate).toLocaleString("es-Es", {timeZone: "America/Bogota"})).split(',')[0],
                newHour: (new Date(inputDate).toLocaleString("es-Es", {timeZone: "America/Bogota"})).split(',')[1],
            };
        },

        reserve () {
            this.$emit("reserve");
        },
    },
};
</script>

<style scoped>
    .modal {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }
    .modal__content {
        width: 60vw;
        max-width: 500px;
        position: absolute;
        background-color: #fff;
        top: 50%;
        left: 50%;
        border-radius: 8px;
        transform: translate(-50%, -50%);
    }

    .form {
        display: flex;
        justify-content:center;
        align-items: center;
        padding: 20px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 40px;
        background-color: #141826;
        color: #e9f3f2;
        text-align: center;
    }
    .form button{
        width: 40%;
        height: 40px;
        color: #E5E7E9;
        background: #268c79;
        border: 1px solid #E5E7E9;
        padding: 5px;
    }
    .form button:hover{
        color: #141826;
        background: #35f2bd; 
    }


</style>

