<template>
    <div class="information">
        <div class="home">
            <h1>Hola <span> hola </span>!</h1>
        </div>

        <div class="test">
            <table>
                <li><p>a</p><p>b</p><p>c</p></li>
            </table>
        </div>
            
        <div class="details">
                     <h2>
                Entrada:
                <span>{{ quotation.entryTime }}</span>
                <br>
                Parking Lot:
                <span>{{ quotation.parkingLot }}</span>
            </h2>
            <h2>
                Availability:
                <span>{{ quotation.state }}</span>
            </h2>
            <h2>
                Price:
                <span>{{ quotation.price }}</span>
            </h2>
            <h2>
                Estacionamiento:
                <span>{{ quotation.parkingLot }}</span>
            </h2>
            <h2>
                Disponibilidad:
                <span>{{ quotation.state }}</span>
            </h2>
            <h2>
                Precio:
                <span>{{ quotation.price }}</span>
            </h2>
        </div>

        <div style="margin-top: 20px">
            <el-button v-on:click="returnHome">Return</el-button>
            <el-button v-on:click="returnSignUp">Save</el-button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "CheckAvailable",
    data: function () {
        return {
            quotation:  {
                entryTime   : "",
                parkingLot  : "",
                price       : 0,
                state       : "",
                vehicleType : ""
            }
        };
    },
    
    computed: {
        ...mapGetters(["detailQuote"]),
    },

    methods: {
        returnHome () {
            this.$emit("loadHomePublic");
        },
        returnSignUp () {
            this.$emit("loadSignUp");
        }        
    },

    mounted () {
        if (this.detailQuote != undefined)
            this.quotation = this.detailQuote;  
    },
    
}
</script>

<style scoped>
    .information {
        background-color: #141826;
		background-image: url("../assets/BGD2.jpg");
		background-repeat: no-repeat;
		background-size: cover;
        margin: 0;
        padding: 0%;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    .information h1 {
        font-size: 60px;
        color: #283747;
    }
    .information h2 {
        font-size: 40px;
        color: #283747;
    }
    .information span {
        color: crimson;
        font-weight: bold;
    }
    .details h3 {
        background: #141826;
        font-size: 35px;
        color: #283747;
        text-align: center;
    }
    .details h2 {
        font-size: 35px;
        color: #283747;
    }
    .details {
        border: 3px solid rgba(0, 0, 0, 0.3);
        border-radius: 20px;
        padding: 30px 80px;
        margin: 30px 0 0 0;
        background: #141826;
        width: 40%;
    
    }
    .test{
        background: #35f2bd;
        width: 40%;
        height: 300px;
        font-size: 12px;
    }
</style>