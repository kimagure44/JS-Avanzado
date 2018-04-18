<template>
    <div id="mapa" v-show="this.$store.getters.getShowMap">
        <div class="tituloMapa">
            <div class="texto" v-text="this.$store.getters.getTitleModalMap"></div>
            <div><i class="fas fa-times" v-on:click="cerrar()"></i></div>
        </div>
        <div id="containerMapa"></div>
    </div>
</template>
<script>
    module.exports = {
        data: function() {
            return {

            }
        },
        created: function() {

        },
        methods: {
            cerrar: function() {
                this.$store.commit("setShowMap", false);
            }
        }
    }
</script>
<style scoped>
    #containerMapa {
        width: 100%;
        height: calc(100% - 40px);
    }
    .tituloMapa {
        height: 40px;
        border-bottom: 1px solid #cccccc;
    }
    #mapa {
        position: fixed;
        left: 10px;
        top: 10px;
        width: calc(100% - 25px);
        height: calc(100% - 25px);
        background: #ffffff;
        border: 3px solid #cccccc;
        overflow: hidden;
    }
    .tituloMapa div i {
        float: right;
        font-size: 25px;
        padding: 5px 10px 0 0;
        cursor: pointer;
    }
    .tituloMapa .texto {
        width: 80%;
        float: left;
        font-size: 20px;
        padding: 5px 0 0 10px;
    }
</style>
