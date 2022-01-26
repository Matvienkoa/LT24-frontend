<template>
    <div id="logo-box">
        <img id="logo" src="../assets/logo.png" alt="">
    </div>
    <div id="login-box">
      <h2 v-if="mode === 'login'">Se connecter</h2>
      <h2 v-else>S'inscrire</h2>
      <p v-if="mode === 'login'">Vous n'avez pas encore de compte? <span @click="switchToCreateAccount()" id="create">Créer un compte</span></p>
      <p v-else>Vous avez déjà un compte? <span @click="switchToLogin()" id="login">Se connecter</span></p>
      <div id="form"> 
        <input v-model="email" type="email" class="input" placeholder="Adresse mail" required>
        <input v-model="password" type="password" class="input" placeholder="Mot de passe" required>
        <p id="condition" v-if="mode === 'create'">Le mot de Passe doit contenir entre 8 et 12 caractères avec au minimum 1 Majuscule, 1 Minuscule et 1 Chiffre</p>
        <button @click="login()" class="" v-if="mode === 'login'">Connexion</button>
        <button @click="createAccount()" class="" v-if="mode === 'create'">Inscription</button>
        <div id="error" v-if="error"> {{ error.message }} </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        mode: 'login',
        error: "",
        email: "",
        password: ""
      }
    },
    methods: {
        switchToCreateAccount() {
            this.mode = 'create'
            this.error = ""
            this.email = ""
            this.password = ""
        },
        switchToLogin() {
            this.mode = 'login'
            this.error = ""
            this.email = ""
            this.password = ""
        },
        login() {
            this.$store.dispatch('login', {
            email: this.email,
            password: this.password
            })
            .then(() => {
                this.$store.dispatch('getCurrentUser');
                this.$router.push('Home');
            })
            .catch((error) => {
                this.error = error.response.data
            })
        },
        createAccount() {
            this.$store.dispatch('createAccount', {
                email: this.email,
                password: this.password
            })
            .then((response) => {
                console.log(response);
                this.login();
            })
            .catch((error) => {
                this.error = error.response.data
            })
        }
    }
  }
</script>

<style scoped>
    #logo-box{
        width: 70%;
        max-width: 500px;
        margin: auto;
        margin-bottom: 50px;
    }
    #logo{
        width: 100%;
    }
    h2{
        font-size: 2rem;
    }
    p{
        font-size: 1.1rem;
        margin-bottom: 30px;
    }
    #create, #login{
        color: rgb(27, 48, 88);
        font-weight: 500;
        text-decoration-line: underline;
        cursor: pointer;
    }
    #login-box{
        width: 70%;
        max-width: 450px;
        margin: auto;
        text-align: center;
    }
    #form{
        display: flex;
        flex-direction: column;
    }
    .input{
        width: 90%;
        max-width: 400px;
        height: 30px;
        margin: auto;
        margin-bottom: 10px;
        border-radius: 5px;
        border: outset;
    }
    #condition{
        font-size: 0.9rem;
        margin-bottom: 0;
    }
    button{
        margin: auto;
        margin-top: 30px;
        width: 120px;
        height: 40px;
        border: none;
        border-radius: 10px;
        background-color: #2677a9;
        color: white;
        font-size: 1rem;
        cursor: pointer;
    }
    #error{
        margin-top: 30px;
        color: red;
    }
</style>