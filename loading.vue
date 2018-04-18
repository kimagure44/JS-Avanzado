<template>
    <div class="loader" v-show="show"></div>
</template>
<script>
    module.exports = {
        props: ['show']
    }
</script>
<style scoped>
    .loader {
        border: 6px solid #f3f3f3;
        border-radius: 100%;
        border-top: 6px solid #3498db;
        width: 30px;
        height: 30px;
        -webkit-animation: spin 2s linear infinite;
        animation: spin 2s linear infinite;
        position: absolute;
        left: 50%;
        top: 50%;
    }
</style>