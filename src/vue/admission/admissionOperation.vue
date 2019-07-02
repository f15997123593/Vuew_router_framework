<template>
  <el-row>
    <el-col :span="6">
      <h1>this is Page1</h1>
    </el-col>
    <el-col :span="12">
      <el-steps :space="200" :active="active" finish-status="success">
        <el-step title="已完成"></el-step>
        <el-step title="进行中"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
    </el-col>
    <el-col>
      <el-button @click="next">下一步</el-button>
    </el-col>
    <el-col>
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
    </el-col>
  </el-row>
</template>
<script>
//入院操作,里面包含多个子页面,这样跳转后可以随时返回上个页面查看填写的数据
import bus from '../../vuex/eventBus'

export default {
  name: "admissionOperation",
  data() {
    return {
      active: 0
    };
  },
  methods: {
    next() {
     
      this.active++;
      console.log(this.active);
    if(this.active>2){
        this.active = 0;
    }
       this.showChildPage();
    },
    showChildPage(){
      if (this.active == 0) {
        this.$router.push({ path: "/admissionOperationPage1" });
      } else if (this.active == 1) {
        this.$router.push({ path: "/admissionOperationPage2" });
      } else if (this.active == 2) {
        this.$router.push({ path: "/admissionOperationPage3" });
      }
    }
  },
  //采用keep-alive后进入页面执行的生命周期
  activated (){
    //路由传值= 使用eventBUs 如果有值,代表是新进入的,则需要清除存储的内容,否则是切换
     this.showChildPage();
     //bus接收值

  },
  mounted() {
    // console.log(this.$route.query.id);
    this.$router.push({ path: "/admissionOperationPage1" });
    //通知主界面缓存该界面
    //  bus.$emit('homePage',{type:'add',path:'/admissionOperation'});
    
    // 延迟1秒添加到 主界面通知存储到keep-alive列表中;目的是为了在主界面清除keep-alive,跳转后显示的是初始数据,然后过一秒后再存储起来, 
    setTimeout(function (){
      bus.$emit('homePage',{type:'add',path:'/admissionOperation'});
    },"1000");
  }
};
</script>

