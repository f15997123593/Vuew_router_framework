<template>
  <div class="hello">
    <h2>this is receive Page</h2>
    <h2>{{$store.state.count}}</h2>    
    <h2>{{receiveMsg}}</h2>    
  </div>
</template>

<script>
import Bus from '../vuex/eventBus'
export default {
  name: 'HelloWorld',
  data () {
    return {
      receiveMsg: 'Welcome'
    }
  },
  methods:{

  },
  mounted(){
      Bus.$on('loginbus',(msg)=>{
          console.log('helloworld');
          console.log(msg);
          this.receiveMsg = msg;
      })
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
