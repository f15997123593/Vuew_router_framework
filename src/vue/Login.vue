<template>
  <div class="hello">
    <h2>Login</h2>
    <button v-on:click='Login'>Login</button>
  </div>
</template>

<script>
    export default {
        name: 'Login',
        data(){
            return{
                ls:'13'
            }
        },
        methods:{
            Login(){
                console.log('login')
                this.$router.push({path:'/'});
            }
        },
        mounted(){

        }
    }
</script>
