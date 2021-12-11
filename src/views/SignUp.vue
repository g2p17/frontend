<template>
    <div class="signUpUser">      
        <div class="container_signUp_user">
            <h2>Registrarse</h2>
            
            <form v-on:submit.prevent="processSignUp" >
                <input type="text" v-model="user.username" placeholder="Usuario">
                <br>
                
                <input type="password" v-model="user.password" placeholder="Contraseña">
                <br>
                
                <input type="text" v-model="user.name" placeholder="Nombre">
                <br>

                <input type="email" v-model="user.email" placeholder="Correo">
                <br>

                <input type="text" v-model="user.identity_document" placeholder="Documento Identidad">
                <br>

                <input type="text" v-model="user.phone_number" placeholder="Numero telefonico">
                <br>                

                <button type="submit">Registrarse</button>
            </form>
        </div>        

    </div>
</template>

<script>

export default {
    name: "SignUp",

    data: function() {
        return {
            user: {
                username            : "",
                identity_document   : "",
                phone_number        : "",
                password            : "",
                name                : "",
                email               : ""
            }
        }
    },

    methods: {
        processSignUp: async function() {
            await this.$store.dispatch("signUpUser", this.user);
            this.$emit("completedSignUp");
        }
    }
}
</script>

<style>
  
</style>