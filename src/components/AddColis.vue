<template>
    <div id="product-box">
        <h1>Ajouter un Colis</h1>
        <div id="form-product">
            <input v-model="number" type="text" id="number-colis" @input="resetError()" placeholder="Entrez votre numéro de colis ici">
            <button @click="addColis()" id="button-add-colis">Ajouter</button>
            <div id="error" v-if="error"> {{ error.message }} </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    name: 'AddColis',
    data() {
        return {
            number: "",
            error: ""
        }
    },
    created: function() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.$store.dispatch('postCurrentPositions', {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                userId: this.getIdentifyUser.userId
            })
        })
    },
    computed: {
        ...mapGetters(["getIdentifyUser"])
    },
    methods: {
        addColis() {
            this.$store.dispatch('postColis', {
                number: this.number,
                userId: this.getIdentifyUser.userId
            })
            .then(() => {
                this.$store.dispatch('getColis')
                this.$store.dispatch('getCurrentUser')
                window.alert("Le colis a bien été ajouté")
            })
            .catch((error) => {
                this.error = error.response.data;
            })
            this.number = ""
        },
        resetError() {
            this.error = ""
        }
    }
}
</script>

<style scoped>
    h1{
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 20px;
    }
    #form-product{
        display: flex;
        flex-direction: column;
        width: 80%;
        max-width: 300px;
        margin: auto;
        align-items: center;
    }
    #number-colis{
        height: 20px;
        width: 80%;
        margin-bottom: 20px;
    }
    #button-add-colis{
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
        color: red;
        margin-top: 20px;
    }
</style>