<template>
    <div class="loginUser">
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
            }
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

</style>