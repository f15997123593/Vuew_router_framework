<template>
  <el-container>
    <!-- 左右布局 -->
    <!-- 侧边栏使用el-aside -->
    <el-aside class="nooverflow" v-bind:style="{ width: collapseWidth+'px'}">
      <el-container class="left_top_icon_bg">
        <img src="../assets/logo.png" width="50px" style="margin:0 10px" v-on:click="showCollapse" />
        <span style="color:white;font-size:20px" v-if="showCollapse">
          守护佳
          <br />智能看护系统
        </span>
      </el-container>
      <el-menu
        router
        class="el-menu-vertical-demo"
        :default-active="activityTab"
        :collapse="isCollapse"
        @open="submenuOpen"
        @close="submenuOpen"
        @select="selectItem"
      >
        <label v-for="(item,index) in navList" :key="index">
          <el-submenu :index="item.url!=undefined?item.url:'' ">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title" v-show="!isCollapse">{{item.name}}</span>
            </template>
            <el-menu-item-group>
              <label v-for="(item1,index1) in item.items" :key="index1">
                <el-menu-item :index="item1.url">
                  <template slot="title">
                    <i :class="item1.icon"></i>
                    <span slot="title">{{item1.name}}</span>
                  </template>
                </el-menu-item>
              </label>
            </el-menu-item-group>
          </el-submenu>
        </label>
      </el-menu>
    </el-aside>
    <!-- 右边整个的布局 -->
    <el-container>
      <!-- //头部使用el-container -->
      <el-header style="height:94px;">
        <el-row>
          <el-col style="margin:6px 0px 7px 0px;">
            <el-dropdown style="float:right;" @command="handleCommand">
              <div style="display: flex;align-items: center;">
                <el-avatar :size="40" :src="headUrl"></el-avatar>
                <span style="font-size:18px;margin-left:10px">
                  老人张
                </span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
                <el-dropdown-item command="signout">注销登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-badge :value="12" class="item badge">
              <i class="el-icon-bell" style="color:black;font-size:30px;" />
            </el-badge>
          </el-col>
          <el-col >
            <el-tabs type="card" v-model="activityTab" closable @tab-remove="removeTab" @tab-click="clickTab">
              <el-tab-pane
                v-for="(item) in tabList"
                :key="item.path"
                :label="item.title"
                :name="item.path"
              ></el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <keep-alive :include="compListStr">
          <router-view />
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import "../assets/icon/iconfont.css";
import bus from '../vuex/eventBus'//引入eventBus,接收子界面传递的跳转指令,然后在父界面跳转,添加tab

export default {
  name: "Home",
  data() {
    return {
      headUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      isCollapse: false,//是否收缩左侧的menu菜单栏
      collapseWidth: 200,//左侧的aside宽度,可以被修改的,动态Css
      activityTab:'',//当前被选中的tab-item
      compList:[],//缓存的组件列表
      compListStr:'',//缓存的组件列表转成字符串,需要在主机的声明name;
      tabList: [],//底部tab记录的数据
      //模拟的菜单栏数据
      navList: [
        {
          name: "入院管理",
          icon: "el-icon-umptongji",
          items: [
            {
              name: "入院列表",
              url: "/admissionList",
              icon: "el-icon-umpbaojingxiaoxi"
            }
          ]
        },
        {
          name: "菜单选项1",
          url: "/Page1",
          icon: "el-icon-umptongji",
          items: [
            {
              name: "菜单选项5",
              url: "/Page5",
              icon: "el-icon-umpbaojingxiaoxi"
            },
            {
              name: "菜单选项6",
              url: "/Page6",
              icon: "el-icon-tickets"
            }
          ]
        },
        {
          name: "菜单选项2",
          url: "/Page2",
          icon: "el-icon-menu",
          items: [
            {
              name: "菜单选项7",
              url: "/Page7",
              icon: "el-icon-tickets"
            },
            {
              name: "菜单选项8",
              url: "/Page8",
              icon: "el-icon-tickets"
            }
          ]
        },
        {
          name: "菜单选项3",
          url: "/Page3",
          icon: "el-icon-menu",
          items: [
            {
              name: "菜单选项9",
              url: "/Page9",
              icon: "el-icon-tickets"
            }
          ]
        }
      ],
    };
  },
  methods: {
    listtoStr(){
      var listStr = '';
      this.compList.forEach(item => {
        listStr = listStr+item+","
      });
        if(listStr.length>0){
            listStr = listStr.substr(0,listStr.length-1)
        }
      this.compListStr = listStr;
      console.log(this.compListStr)
    },
    showCollapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.collapseWidth = 70;
      } else {
        this.collapseWidth = 200;
      }
    },
    //选中menu-item的事件
    selectItem(item) {
      //需要将该路由
      this.addTab(item);
    },
    //完成submenu的open和close事件
    submenuOpen(url) {
      if(url != undefined && url!=''){
        this.$router.push({ path: url });
        this.addTab(url);

      }
    },
    //对于没有page展示的时候,显示默认的第一个page
    getFirstPage() {
      if (this.navList != null) {
        if(this.navList[0].url!=undefined){
        this.$router.push({ path: this.navList[0].url });
        this.addTab(this.navList[0].url);
        this.activityTab = this.navList[0].url;
        this.addRouterInclude(this.navList[0].url);
        }else{
          this.$router.push({ path: this.navList[0].items[0].url });
          this.addTab(this.navList[0].items[0].url);
          this.activityTab = this.navList[0].items[0].url;
          this.addRouterInclude(this.navList[0].items[0].url);
        }
    
      }
    },
    //给Tab添加tab-item
    //针对没有
    addTab(tabpath) {
      //是否存在相同的tab-item
      var isHaveSameItem = false;
      this.tabList.forEach(item => {
        if (tabpath == item.path) {
          isHaveSameItem = true;
          this.activityTab = tabpath;
        }
      });
      //如果不存在,则可以添加新的tab-item
      if (!isHaveSameItem) {
        //需要遍历第一层和第二层
        this.navList.forEach(item => {
          if (item.url == tabpath) {
            this.tabList.push({
              path: item.url,
              id: item.name,
              title: item.name
            });
            this.activityTab = item.url;
            this.addRouterInclude(item.url);
          } else {
            var items = item.items;
            items.forEach(item1 => {
              if (item1.url == tabpath) {
                this.tabList.push({
                  path: item1.url,
                  id: item1.name,
                  title: item1.name
                });
                this.activityTab = item1.url;
                this.addRouterInclude(item1.url);
              }
            });
          }
        });
      }
    },
    //删除tab的点击事件
    removeTab(targetName) {
      console.log(targetName);
      let removeindex = 0;
      for (let i = 0; i < this.tabList.length; i++) {
        if (this.tabList[i].path == targetName) {
          this.tabList.splice(i, 1);
          removeindex = i;
          this.removeRouterInclude(targetName);
          break;
        }
      }
      //如果没有tab,则跳转到第一个页面
      if (this.tabList.length == 0) {
        this.getFirstPage();
      }else{
        //判断当前的页面
        //如果不是,则不跳转
        //如果是被删除的页面
        //则加载上一个页面
 //       console.log(this.$route.path);
 // 由于部分界面是子页面url
  //      if(targetName.indexOf(this.tabList[i].path) != -1){
        if(this.$route.path.indexOf(targetName) != -1){
          if(removeindex != 0){
            this.activityTab =this.tabList[removeindex - 1].path;
            this.$router.push({ path: this.tabList[removeindex - 1].path });
          }else{
            this.activityTab =this.tabList[0].path;
            this.$router.push({ path: this.tabList[0].path });
          }
        }
      }
    },
    //点击tab的事件
    clickTab(targetName) {
      this.$router.push({ path: targetName.name });
      this.activityTab = targetName.name;
    },
    //处理头像的下拉菜单的点击事件
    handleCommand(command){
      if(command == 'userInfo'){
          //手动添加不存在navList内的tab
          this.addOtherRouter('/userInfo','个人信息');
      }else if(command == 'signout'){
          //退出登录
          this.$store.commit('logout')
          this.$router.push({path:'/login'});
      }
    },
    //根据url添加
    addRouterInclude(url){
      console.log(this.compList.indexOf(url.substring(1,url.length)));
      if(this.compList.indexOf(url.substring(1,url.length)) == -1){
        this.compList.push(''+url.substring(1,url.length));
        this.listtoStr();
      }
    },
    //根据URL移除
    removeRouterInclude(url){
      if(this.compList.indexOf(url.substring(1,url.length)) != -1){
        console.log('remove');
        this.compList.splice(this.compList.indexOf(url.substring(1,url.length)), 1); 
        this.listtoStr();
      }
    },
    //添加其他的路由到tab中
    addOtherRouter(url,title,id){
      console.log(url);
      var isHaveSameItem = false;
      this.tabList.forEach(item => {
        if (url == item.path) {
          isHaveSameItem = true;
          this.activityTab = url;
        }
      });
      //如果不存在,则可以添加新的tab-item
      if (!isHaveSameItem) {
          this.tabList.push({
              path: url,
              id: ''+url,
              title: ''+title
          });
          //启动include缓存
          // this.addRouterInclude(url);
      }
        this.$router.push({ path: url, query: {id: id }});
        this.activityTab = url;
    },
    //根据子页面传递过来的Page信息来切换显示,跳转子页面
    //不在子页面写跳转是为了要添加tab
    geteventBusMshJump(msg){
      //添加已经存在navList内的tab
      if(msg.type == 'add'){
        //将子界面通知要存储的路由 添加到keep-alive中
        //示例如 bus.$emit('homePage',{type:'add',path:'/admissionOperation'});
          this.addRouterInclude(msg.path);
      }else if(msg.type == 'jump'){
        //跳转到指定界面
        //这种跳转需要判断是否需要清除keep-alive,针对需要清除的,调用remove()方法清除keep-alive;
        //示例入admissionList的 bus.$emit('homePage',{type:'jump',path:'/admissionOperation',id:'12',title:'入院详情'});
        this.removeRouterInclude(msg.path);
        this.addOtherRouter(msg.path,msg.title,msg.id)
      }

    },
    
  },
  mounted() {
    //获取当前url
    //由于顶部的tabList未保存,就不该功能了
    //放弃跳转指定页面
    //改成跳转第一页
    this.getFirstPage();
    bus.$on('homePage',(msg)=>{
        this.geteventBusMshJump(msg);
    });

  }
};
</script>

<style scoped>
.nooverflow {
  overflow-x: hidden;
  overflow-y: hidden;
}
.left_top_icon_bg {
  background: #3A77E2;
  height: 80px;
  display: flex;
  align-items: center;
}

.badge{
  float:right;
  margin-right:30px;
  margin-top:6px
}


</style>

