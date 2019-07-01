<template>
    <div>
    page5
    <p>
        {{msg}}
    </p>
    </div>
</template>
<script>
export default {
    data(){
        return{
            msg: this.$store.state.count,
        }
    },
    methods:{

    },
    mounted(){
    }
}
</script>

