<template>
    <div>
        page1
        <SendDataPage>
            <template slot-scope="props">
                <span>this is parent</span>
                <span>{{props.text}}</span>
            </template>
        </SendDataPage>
        <ReceiveData></ReceiveData>
    </div>
</template>
<script>
import SendDataPage from '../components/SendDate'
import ReceiveData from '../components/ReceiveData'
export default {
    name: 'Page1',
    components:{
        SendDataPage,ReceiveData
    }
}
</script>

