<template>
    <!--photo></photo-->
    <transition mode="out-in">
        <router-view></router-view>
    </transition>

    <!--div>
      <button @click="change">Change</button>
      <component :is="currentView"></component>
    <div-->

</template>

<script>
    import Photo from './Photo.vue'
    import Login from './Login.vue'
    import Register from './Register.vue'
    import Gallery from './Gallery.vue'

    export default {
        name: 'app',
        components : {
            Photo,
            Login,
            Register,
            Gallery
        },
        data () {
            return {
                currentView : 'Login'
            };
        },
        methods: {
          change: function() {
            this.currentView = (this.currentView == 'Login') ? 'Register' : 'Login';
          }
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    a {
        text-decoration:none;
    }
</style>
