<template>
    <div>
        <h1>Parking lots {{ userDetailById.name }}</h1>
        <el-table
        :data="parkinglotsByadmin.filter(
        (data) =>
          !search || data.parking_place.toLowerCase().includes(search.toLowerCase())
        )" 
        max-height="400"
        :row-style="{height: '20px'}"
        :cell-style="{'font-size': '14px', color: 'black'}"
        :header-row-style="{'font-size': '18px', padding: '10px'}"
        style="width: 80%"   
        >
            <el-table-column fixed prop="parking_place" label="Parking place" width="150" />
            <el-table-column prop="vehicle_slots" label="Vehicles" width="150" />
            <el-table-column prop="motorcycles_slots" label="Motorcycles" width="120" />
            <el-table-column prop="bicycles_slots" label="Bicycles" width="150" />
            <el-table-column prop="person_with_disability_price" label="Disable parking" width="150" />
            
            <el-table-column align="right" width="220">
                <template #header>
                    <el-input v-model="search" size="mini" placeholder="Type to search" />
                </template>
    
                <template #default="scope">
                    <el-button 
                    class="button" 
                    size="mini" 
                    @click="handleEdit(scope.$index, scope.row)">
                        Edit
                    </el-button>
                    <el-button
                    class="button"
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">
                        Delete
                    </el-button>
                </template>

            </el-table-column>
        </el-table>        
    </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
    name: "AdminParkinglots",
    data() {
        return {
            search: '',
        };
    },
    computed: {
		...mapGetters(["parkinglotsByadmin", "err", "userDetailById"]),
	},
    methods: {
        handleEdit(index, row) {
            console.log(index, row)
        },
        handleDelete(index, row) {
            console.log(index, row)
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

        console.log(this.userDetailById)
		await this.$store.dispatch("getParkinglotsByAdmin", this.userDetailById.identity_document);

		if (this.err) {
			//this.error = this.err[0].body.detail;
            console.log(this.err);
			this.delayedGreeting();
		}
	},    
}
</script>

<style scoped>

.button {
    width: 30%;
}

</style>