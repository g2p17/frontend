<template>
  <div class="adminUI">
    <table class="admintable"> 
        <div>
            <router-link to="/quotation"><button>Parking Lots</button></router-link>
            <router-link to="/quotation"><button>Customers</button></router-link>
            <router-link to="/quotation"><button>Reservations</button></router-link>
        </div>
    </table>
  </div>
</template>

<script>

export default {
  name: 'adminUI',

}

</script>


<style scoped>
.adminUI{
	padding: 0%;
	margin: 0%;
}
.admintable{
	padding: 0%;
	margin: 0%;
	background-color: #141826;
	background-image: url("../assets/Adm.jpg");
	width: 100%;
	height:1600px;
	background-size: cover;
    text-align: center;
}
</style>