<template>
<div>
    <span>
    page2
    {{numdata}}
    </span>
<button v-on:click='add'>Add</button>
</div> 
</template>
<script>
export default {
    name: "Page2",
    data(){
        return{
            numdata:0,
        }
    },
    methods:{
        add(){
            this.numdata++;
        }
    },
    mounted(){
        console.log('page2 mounted');
    },
    
}
</script>

