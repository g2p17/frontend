<template>
    <div class="loginUser">
        <div class="containerLogin">
            <el-form ref="form" :model="loginUser" label-width="100px" size="mini">
                <el-form-item label="User">
                    <el-input v-model="loginUser.user" placeholder="Your username"></el-input>
                </el-form-item>
                <el-form-item label="Password">
                    <el-input v-model="loginUser.pass" placeholder="Your more secret key"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="processSignUp('loginUser')">Submit</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="containerLoginUser">
            <h2>Iniciar sesión</h2>
            <form v-on:submit.prevent="processLogInUser" method="POST">
                <input type="text" v-model="user.username" placeholder="Username">
                <br>
                <input type="password" v-model="user.password" placeholder="Password">
                <br>
                <button type="submit">Iniciar Sesion</button>
            </form>
        </div>
    </div>
</template>

<script>

export default {
    name: "LogIn",
    
    data: function(){
        return {
            user: {
                username : "",
                password : ""
            },
            loginUser: {
                username : "",
                password : ""
            },
        }
    },

    methods: {
        processLogInUser: async function(){
            await this.$store.dispatch("logInUser", this.user);
            this.$emit('completedLogIn');
        }
    }
}
</script>

<style>
	.loginUser{
    margin: 0;
    padding: 0%;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #141826;
		background-image: url("../assets/BGD1.jpeg");
		background-repeat: no-repeat;
		background-size: cover;
    }
	.containerLogin{
		width: 40%;
		padding: 3%;
		background-color: #141826;
	}
</style>