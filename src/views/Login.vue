<template>
    <div class="loginUser">
        <div class="containerLogin">
            <el-alert v-if="showError" :title="error" type="error" show-icon> </el-alert>
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
                    <p><router-link to="/user/signUp"><a>Or create an account</a></router-link></p>
                </el-form-item>
                
            </el-form>
        </div>
    </div>
</template>

<script>
import  { mapGetters }  from "vuex";

export default {
    name: "LogIn",
    
    data: function(){
        return {
            user: {
                username : "",
                password : ""
            },
            error: undefined,
            showError: false,
        }
    },

    computed: {
        ...mapGetters(["err"])
    },

    methods: {
        processLogInUser: async function(){
            await this.$store.dispatch("logInUser", this.user);
            
            if (this.err != null) {
                this.error = this.err[0].body;
                this.delayedGreeting();
                return;
            }
            
            this.$emit('completedLogIn');
        },
        mysleep: function (ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        delayedGreeting: async function () {
            this.showError = true;
            await this.mysleep(4000);
            this.showError = false;
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
.loginUser button p{
    width: 50%;
    height: 10%;  
}
.loginUser a{
    font-size: 13px;
    color: aliceblue;
}
</style>