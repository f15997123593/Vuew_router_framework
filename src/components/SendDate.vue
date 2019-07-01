<template>
  <div class="hello">
    <h2>count: {{$store.state.count}}</h2>
    <h2>compu count: {{$store.getters.getStateCount}}</h2>
    <button v-on:click='Add'>Add</button>
    <button v-on:click='Reduct'>Reduct</button>
    <button v-on:click='Bus'>Bus</button>
    <div class="child">
    <slot text="this is child send data slot">
    </slot>
    </div>
  </div>
</template>

<script>
import bus from '../vuex/eventBus'
export default {
    name: 'Login',
    data(){
        return{
            add:'add',
        }
    },
    methods:{
        Add(){
            this.$store.commit("add");
        },
        Reduct(){
            this.$store.commit("reduction");
        },
        Bus(){
            bus.$emit("loginbus","i have click event");
        }
    },
    mounted(){
        bus.$on('loginbus',(msg)=>{
            console.log('login');
            console.log(msg);
        });
    }


}
</script>
