<template>
    <!--photo></photo-->
    <gallery></gallery>
    <!--description></description-->
    <!--div>
      <button @click="change">Change</button>
      <component :is="currentView"></component>
    <div-->

</template>

<script>
    import Photo from './Photo.vue'
    import Description from './Description.vue'
    import Login from './Login.vue'
    import Register from './Register.vue'
    import Gallery from './Gallery.vue'

    export default {
        name: 'app',
        components : {
            Photo,
            Description,
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
</style>
