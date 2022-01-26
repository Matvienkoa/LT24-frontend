<template>
    <nav>
        <div>
            <router-link to="/">
                <span @click="logout()">Déconnexion</span>
            </router-link>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Nav',
    methods: {
        logout() {
            this.$store.commit("LOG_OUT")
        }
    }
}
</script>

<style scoped>
    nav{
        height: 50px;
        width: 100%;
        background-color: #2677a9;
    }
    div{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    a{
        text-decoration: none;
    }
    span{
        color: white;
        cursor: pointer;
        margin-right: 20px;
        font-size: 1.1rem;
    }
</style>