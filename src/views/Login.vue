<template>
    <div class="loginUser">
        <div class="containerLogin">
            <el-form
            ref="form" 
            label-width="100px" 
            size="medium"
            v-on:submit.prevent="processLogInUser"
            ><el-form-item label="User">
                    <el-input 
                    type="text"
                    v-model="user.username" 
                    placeholder="Your username"
                    ></el-input>
                </el-form-item>
                <el-form-item label="Password">
                    <el-input 
                    type="password"
                    v-model="user.password" 
                    placeholder="Your more secret key"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="processLogInUser">LOGIN</el-button>
                    <p><router-link to="/user/signUp"> Or create an account</router-link></p>
                </el-form-item>
                
            </el-form>
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
        }
    },

    methods: {
        processLogInUser: async function(){
            await this.$store.dispatch("logInUser", this.user);
            this.$emit('completedLogIn');
        },
        onSubmit() {
            console.log('submit!')
        },
    }
}
</script>

<style scoped>
.loginUser{
    margin: 0;
    padding: 0;
    height: 660px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #141826;
    background-image: url("../assets/BGD1.jpeg");
    background-repeat: no-repeat;
    background-size: cover;
}
.loginUser button{
    width: 50%;
    height: 40px;
    color: #E5E7E9;
    background: #268c79;
    border: 1px solid #E5E7E9;
    padding: 3px;
}
.loginUser button:hover{
    color: #141826;
    background: #35f2bd; 
}
.containerLogin{
    width: 40%;
    padding: 3%;
    background-color: #141826;
    color: #e9f3f2;
}
loginUser button p{
    width: 50%;
    height: 10%;
    font-size: 12px;
    color: aliceblue;
}
</style>