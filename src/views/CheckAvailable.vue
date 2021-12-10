<template>
    <div class="information">
        <div class="home">
            <h1>Hola <span> hola </span>!</h1>
        </div>

        <div class="details">
            <h3>Su información es la siguiente</h3>
            <h2>
                Entrada:
                <span>{{ quotation.entryTime }}</span>
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
        margin: 0;
        padding: 0%;
        width: 100%;
        height: 100%;
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
    }
</style>