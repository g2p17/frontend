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
    import gql from 'graphql-tag';

    export default {
        name: "SignUp",

        data: function(){
            return {
                user: {
                    username: "",
                    identity_document: "",
                    phone_number: "",
                    password: "",
                    name: "",
                    email: "",
                    role: "customer"
                }
            }
        },

        methods: {
            processSignUp: async function(){
                await this.$apollo.mutate(
                    {
                        mutation: gql`
                            mutation SignUpUser($userInput: SignUpInput) {
                              signUpUser(userInput: $userInput) {
                                refresh
                                access
                              }
                            }
                         `,
                        variables:{
                            userInput: this.user,
                        }
                    }
                )
                .then((result) => {
                    let dataSignUp = {
                        username     : this.user.username,
                        tokenRefresh : result.data.signUpUser.refresh,
                        tokenAccess  : result.data.signUpUser.access
                    };

                    console.info(dataSignUp);
                    this.$emit("completedSignUp", dataSignUp);
                })
                .catch((error) => {
                    console.log(error.message);
                    alert("ERROR. Fallo en el registro. Intente de nuevo.")
                })
            }
        }
    }
</script>

<style>
  
</style>