<template>
    <transition mode="out-in" enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
        <router-view></router-view>
    </transition>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    @import url("../css/animate.css");
    * {
        margin: 0;
        padding: 0;
    }

    a {
        text-decoration:none;
    }

    ::-webkit-scrollbar{width: 0;}
</style>
