<template>
	<div class="signUser">		
		<div class="containersignUser">
			<el-alert v-if="showError" :title="error" type="error" show-icon> </el-alert>
			
			<el-form 
			ref="user" 
			:model="user"
			:rules="rules"
			label-width="100px" size="medium"
			>
				<el-form-item label="User" prop="username">
					<el-input 
					type="text"
					v-model="user.username" 
					placeholder="Your username"
					></el-input>
				</el-form-item>
				<el-form-item label="Password" prop="password">
					<el-input 
					type="password"
					v-model="user.password"
					placeholder="Your more secret key"
					></el-input>
				</el-form-item>
				<el-form-item label="Name" prop="name">
					<el-input 
					type="text" 
					v-model="user.name" 
					placeholder="Your name"
					></el-input>
				</el-form-item>
				<el-form-item label="Email" prop="email">
					<el-input 
					type="email" 
					v-model="user.email"
					placeholder="Your principal email"
					></el-input>
				</el-form-item>
				<el-form-item label="ID" prop="identity_document">
					<el-input		
					v-model="user.identity_document"
					placeholder="ID"
					></el-input>
				</el-form-item>
				<el-form-item label="mobile" prop="phone_number">
					<el-input
					v-model="user.phone_number"
					placeholder="Your mobile number"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="submitForm('user')">Submit</el-button>
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
			rules: {			
				username: [
					{
						required: true,
						message: 'Please input username',
						trigger: 'blur',
					},
					{
						min: 5,
						max: 10,
						message: 'Length should be 5 to 10',
						trigger: 'blur',
					},
				],
				password: [
					{
						required: true,
						message: 'Please input password',
						trigger: 'blur',
					},
					{
						min: 8,
						max: 20,
						message: 'Length should be 8 to 20',
						trigger: 'blur',
					},
				],
				name: [
					{
						required: true,
						message: 'Please input name',
						trigger: 'blur',
					},
				],
				email: [
					{
						type: 'email', 
						required: true,
						message: 'Please input email',
						trigger: 'blur',
					},
				],
				phone_number: [
					{ 
						required: true, 						
						message: 'phone number is required',
						trigger: 'blur',
					},
				],
				identity_document: [
					{
						required: true,
						message: 'Please input id',
						trigger: 'blur',
					},
				],
			}
		};
	},

	computed: {
		...mapGetters(["err"])
	},

	methods: {
		processSignUp: async function () {
			await this.$store.dispatch("signUpAdmin", this.user);

			if (this.err != null) {
                this.error = this.err;
                this.delayedGreeting();
				this.$store.dispatch("resetError", undefined);				
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
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					//alert('submit!')
					this.processSignUp();
				} else {
					//console.log('error submit!!')
					return false
				}
			})
		},
		resetForm(formName) {
			this.$refs[formName].resetFields()
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