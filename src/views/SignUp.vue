<template>
	<div class="signUpUser">
		<div class="container2">
			<el-form ref="form" :model="formSign" label-width="100px" size="mini">
				<el-form-item label="User">
					<el-input v-model="formSign.user" placeholder="Your username"></el-input>
				</el-form-item>
				<el-form-item label="Password">
					<el-input v-model="formSign.pass" placeholder="Your more secret key"></el-input>
				</el-form-item>
				<el-form-item label="Name">
					<el-input v-model="formSign.name" placeholder="Your name"></el-input>
				</el-form-item>
				<el-form-item label="Email">
					<el-input v-model="formSign.email" placeholder="Your principal email"></el-input>
				</el-form-item>
				<el-form-item label="ID">
					<el-input v-model="formSign.identity" placeholder="ID"></el-input>
				</el-form-item>
				<el-form-item label="Mobile">
					<el-input v-model="formSign.mobile" placeholder="Your mobile number"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="processSignUp('FormSign')">Submit</el-button>

			</el-form-item>
		</el-form>
    </div>

    <div class="container_signUp_user">
      <h2>Registrarse</h2>

      <form v-on:submit.prevent="processSignUp">
        <input type="text" v-model="user.username" placeholder="Usuario" />
        <br />

        <input
          type="password"
          v-model="user.password"
          placeholder="Contraseña"
        />
        <br />

        <input type="text" v-model="user.name" placeholder="Nombre" />
        <br />

        <input type="email" v-model="user.email" placeholder="Correo" />
        <br />

        <input
          type="text"
          v-model="user.identity_document"
          placeholder="Documento Identidad"
        />
        <br />

        <input
          type="text"
          v-model="user.phone_number"
          placeholder="Numero telefonico"
        />
        <br />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  </div>
</template>

<script>
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
      formSign: {
        user: '',
        pass: '',
        name: '',
        email: '',
        identity: '',
        mobile: '',
      }    
    };
  },

  methods: {
    processSignUp: async function () {
      await this.$store.dispatch("signUpUser", this.user);
      this.$emit("completedSignUp");
    },
  },
};
</script>

<style>
	.signUpUser{
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
	.container2{
		width: 40%;
		padding: 3%;
		background-color: #141826;
		
	}

</style>