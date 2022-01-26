<template>
    <div id="product-box">
        <h1>Suivre votre Colis</h1>
        <div id="form-product">
            <input v-model="number" type="text" id="number-colis" @input="resetError()" placeholder="Entrez le numéro de colis ici" required>
            <button @click="searchColis()" id="button-search-colis">Rechercher</button>
            <div id="error" v-if="error"> {{ error }} </div>
        </div>
    </div>
    <GMapMap v-if="mode === 'yesNumber' && error === ''" :center="getCurrentPositions" :zoom="8">
        <GMapCluster>
            <GMapMarker :position="getCurrentPositions" :clickable="true" :draggable="false" @click="center=getCurrentPositions" />
        </GMapCluster>
    </GMapMap>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'SearchColis',
    data() {
        return {
            number: "",
            mode: "noNumber",
            error: ""
        }
    },
    computed: {
        ...mapGetters(["getCurrentColis", "getCurrentPositions"])
    },
    methods: {
        searchColis() {
            if (!this.number) {
                this.error = "Merci de renseigner un numéro de Colis"
            } else {
                this.$store.dispatch('getCurrentColis', {
                    number: this.number
                })
                .then(() => {
                    this.switchToYesNumber()
                })
                .catch((error) => {
                    this.error = error.response.data.message
                })
            }
        },
        switchToYesNumber() {
            this.mode = "yesNumber"
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
    #button-search-colis{
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
        margin-top: 15px;
        text-align: center;
    }
    .vue-map-container{
        height: 350px;
        width: 90%;
        margin: auto;
        margin-top: 40px;
    }
</style>