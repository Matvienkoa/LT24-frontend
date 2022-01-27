<template>
    <div>
        <h1>Mes Colis disponibles au suivi</h1>
        <div id="colis-list">
            <span class="colis-number" v-for="colis in getCurrentUser.colis" :key="colis.id">
                <span class="colis-desc">
                    <span class="number">{{colis.number}}</span>
                    <span v-if="selectedNumber !== colis.number && mode === 'readColis' && modeConfirm === 'no'" @click="stockNumber(colis), switchToEditColis()" class="edit">✏️</span>
                    <span v-if="selectedNumber !== colis.number && mode === 'readColis' && modeConfirm === 'no'" @click="stockNumber(colis), switchToModeConfirm()" class="delete">❌</span>
                </span>
                <span v-if="modeConfirm === 'yes' && selectedNumber === colis.number" class="colis-confirm-delete">
                    <span class="question">Supprimer le Colis?</span>
                    <span @click.prevent="deleteColis(colis), switchToNoModeConfirm()" class="yes">Oui</span>
                    <span @click="switchToNoModeConfirm()" class="no">Non</span>
                </span>
                <span class="colis-edit">
                    <input class="edit-input" v-if="mode === 'editColis' && selectedNumber === colis.number" @input="resetError()" type="text" v-model="number" placeholder="Numéro de colis">
                    <span v-if="mode === 'editColis' && selectedNumber === colis.number" @click="switchToReadColis(), resetError()" class="cancel-edit">❌</span>
                    <span v-if="mode === 'editColis' && selectedNumber === colis.number" @click="editColis(colis)" class="valid-edit">✔️</span>
                </span>
                <div id="error" v-if="error && selectedNumber === colis.number"> {{ error.message }} </div>
            </span>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    name: 'ColisList',
    data() {
        return {
            mode: "readColis",
            modeConfirm: "no",
            number: "",
            selectedNumber: "",
            error: ""
        }
    },
    methods: {
        deleteColis(colis) {
            this.$store.dispatch('deleteColis', colis)
            .then(() => {
                window.alert("Le colis a bien été supprimé")
                this.$store.dispatch('getCurrentUser');
            })
            .catch((error) => {
                console.log(error);
            });
        },
        editColis(colis) {
            this.$store.dispatch('editColis', {
                number: this.number,
                userId: colis.userId,
                id: colis.id
            })
            .then(() => {
                window.alert("Le colis a bien été modifié")
                this.$store.dispatch('getCurrentUser');
            })
            .catch((error) => {
                this.error = error.response.data;
            });
            this.number = ""
        },
        switchToEditColis() {
            this.mode = "editColis"
        },
        switchToReadColis() {
            this.mode= "readColis"
            this.selectedNumber = ""
            this.number = ""
        },
        stockNumber(colis) {
            this.selectedNumber = colis.number
        },
        switchToModeConfirm() {
            this.modeConfirm = "yes"
        },
        switchToNoModeConfirm() {
            this.modeConfirm = "no"
            this.selectedNumber = ""
        },
        resetError() {
            this.error = ""
        }
    },
    computed: {
        ...mapGetters(["getIdentifyUser", "getCurrentUser"])
    }
}
</script>

<style scoped>
    h1{
        text-align: center;
        margin-top: 50px;
        margin-bottom: 30px;
        font-size: 1.4rem;
    }
    #colis-list{
        width: 80%;
        display: flex;
        flex-direction: column;
        margin: auto;
    }
    .colis-number{
        margin-bottom: 15px;
    }
    .colis-desc{
        display: flex;
        justify-content: space-between;
        font-size: 1rem;
        font-weight: normal;
    }
    .colis-edit{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1rem;
        font-weight: normal;
    }
    .edit-input{
        margin-top: 8px;
        margin-bottom: 10px;
        width: 80%;
    }
    .number{
        width: 80%;
        overflow: auto;
    }
    .edit, .valid-edit, .cancel-edit, .delete{
        font-size: 0.8rem;
        cursor: pointer;
    }
    #error{
        color: red;
        margin-top: 5px;
    }
    .colis-confirm-delete{
        display: flex;
        justify-content: space-around;
        margin-top: 8px;
        font-weight: 600;
    }
    .no{
        color: red;
        cursor: pointer;
    }
    .yes{
        color: green;
        cursor: pointer;
    }
</style>
