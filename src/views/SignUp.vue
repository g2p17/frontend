<template>
	<div class="signUser">		
		<div class="containersignUser">
			<el-alert v-if="showError" :title="error" type="error" show-icon> </el-alert>
			<el-form ref="form" :model="user" label-width="100px" size="medium">
				<el-form-item label="User">
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
				<el-form-item label="Name">
					<el-input 
					type="text" 
					v-model="user.name" 
					placeholder="Your name"
					></el-input>
				</el-form-item>
				<el-form-item label="Email">
					<el-input 
					type="email" 
					v-model="user.email"
					placeholder="Your principal email"
					></el-input>
				</el-form-item>
				<el-form-item label="ID">
					<el-input 
					type="text"
					v-model="user.identity_document"
					placeholder="ID"
					></el-input>
				</el-form-item>
				<el-form-item label="Mobile">
					<el-input 
					type="text"
					v-model="user.phone_number"
					placeholder="Your mobile number"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="processSignUp">Submit</el-button>
				</el-form-item>
				<h3></h3>
			</el-form>
		</div>
    </div>
</template>

<script>
import  { mapGetters }  from "vuex";

export default {
	name: "SignUp",

	data: function () {
		return {
			user: {
				username: "",
				identity_document: "",
				phone_number: "",
				password: "",
				name: "",
				email: "",
			},
            error: undefined,
            showError: false,			    
		};
	},

	computed: {
		...mapGetters(["err"])
	},

	methods: {
		processSignUp: async function () {
			await this.$store.dispatch("signUpUser", this.user);

			if (this.err != null) {
                this.error = this.err[0].body.email[0];
                this.delayedGreeting();
                return;
            }

			this.$emit("completedSignUp");
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
};
</script>

<style scoped>
.signUser{
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
.signUser button{
    width: 50%;
    height: 40px;
    color: #E5E7E9;
    background: #268c79;
    border: 1px solid #E5E7E9;
    padding: 10px 30px;
}
.signUser button:hover{
    color: #141826;
    background: #35f2bd; 
}
.containersignUser{
    width: 40%;
    padding: 3%;
    background-color: #141826;
    color: #e9f3f2;
}
</style>