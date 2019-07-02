<template>
  <div class="login">
    <h1 class="login-img"><img :src="logo.login_logo" alt="" style="vertical-align:middle;margin-left:40px;"></h1>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title" v-if="showLogoOrEdit">账号登录</h3>
      <h3 class="title" v-if="!showLogoOrEdit">修改密码</h3>
      <!-- 登录页面账号 -->
      <el-form-item prop="account" v-if="showLogoOrEdit">
        <el-input prefix-icon="el-icon-mobile-phone" type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号" @focus="focusAccount"></el-input>
      </el-form-item>
      <!-- 修改密码页面账号 -->
      <el-form-item prop="accountEdit" v-if="!showLogoOrEdit">
        <el-input prefix-icon="el-icon-mobile-phone" type="text" v-model="ruleForm2.accountEdit" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <!-- 登录页面密码 -->
      <el-form-item prop="checkPass" v-if="showLogoOrEdit">
        <el-input prefix-icon="el-icon-goods" :type="passwordEye" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码" @focus="focusShowPasswordEye"></el-input>
          <div v-if="PasswordEyeDiv">
            <img :src="eye.eye_open" v-if="eyeShowPassword" @click="changePassword('show')" alt="" style="position:absolute;top:5px;right:10px;cursor: pointer;">
            <img :src="eye.eye_close" v-if="!eyeShowPassword" @click="changePassword('hide')" alt="" style="position:absolute;top:5px;right:10px;cursor: pointer;">
          </div>
      </el-form-item>
      <!-- 修改密码页面旧密码 -->
       <el-form-item prop="oldPassEdit" v-if="!showLogoOrEdit">
        <el-input prefix-icon="el-icon-goods" type="password" v-model="ruleForm2.oldPassEdit" auto-complete="off" placeholder="旧密码"></el-input>
      </el-form-item>
      <!-- 登录页面验证码 -->
      <el-form-item class="code" prop="code" v-if="showLogoOrEdit">
          <el-col :span=4><el-input style="width:100px;" placeholder="验证码" v-model="ruleForm2.code" @focus="focusCode"></el-input></el-col>
          <el-col :span=8 :offset=5><span class="code"><s-identify :identifyCode="identifyCode"></s-identify></span></el-col>
          <el-col :span=7><span>看不清？</span><span class="refreshCode" @click="refreshCode">换一张</span></el-col>
      </el-form-item>
      <!-- 修改密码页面新密码 -->
      <el-form-item prop="newPassEdit" v-if="!showLogoOrEdit">
        <el-input prefix-icon="el-icon-goods" type="password" v-model="ruleForm2.newPassEdit" auto-complete="off" placeholder="新密码"></el-input>
      </el-form-item>
      <!-- 登录页面记住和忘记密码 -->
      <el-form-item style="margin-top:3px;" v-if="showLogoOrEdit">
          <el-col :span='19' style="height:30px;"><el-checkbox v-model="check" class="remember">记住密码</el-checkbox></el-col>
          <!-- 暂时没有接口，先隐藏此功能 -->
          <!-- <el-col :span=5 class="remidpassword"><el-button type="text" @click="gotoEdit">忘记密码？</el-button></el-col> -->
      </el-form-item>
      <!-- 登录页的登录按钮和修改密码页的修改按钮 -->
      <el-form-item style="width:100%;">
        <el-button  v-if="showLogoOrEdit" type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" @keyup.enter.native.prevent="enterLogin(ruleForm2)" :loading="logining">登录</el-button>
      </el-form-item>
        <!-- 修改密码页面去登录 -->
      <el-form-item style="margin-top:3px;" v-if="!showLogoOrEdit">
          <el-col :span=3 :offset=21 class="remidpassword"><el-button type="text" @click="gotoLogo">去登录</el-button></el-col>
      </el-form-item>
      <!-- <el-form-item style="height:20px;line-height:20px">
        <el-col :span=20 style="height:30px;">还没有账号?</el-col>
        <el-col :span=4 class="noresiger">立即注册</el-col>
      </el-form-item> -->
    </el-form>
    <h4 class="bottom-title">@2010-2025 武汉日创科技有限公司 版权所有 鄂ICP备15022466号-2</h4>
  </div>
</template>

<script>
 import login_logo from '../assets/login_logo.png'
  import eye_open from '@/assets/eye_open.png'
  import eye_close from '@/assets/eye_close.png'
  import SIdentify from '@/components/identify' //验证码组件

    export default {
           data() {
      var validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
          // this.identifyCode = "";
          // this.makeCode(this.identifyCodes, 4);
        } else if(value =="0000"){//设置了一个通用的0000验证码，用于测试，后期测完再行删除
          callback();
        }else if (value !== this.identifyCode) {
          callback(new Error('请输入正确的验证码!'));
          // this.identifyCode = "";
          // this.makeCode(this.identifyCodes, 4);
        } else{
          callback();
        }
      };
      var validateoldPassEdit=(rule, value, callback) =>{
          if (value === '') {
            callback(new Error('请输入旧密码'));
          } else if (value !== this.ruleForm2.newPassEdit) {
            callback(new Error('旧密码和新密码不一致!'));
          } else {
            callback();
          }
      };
      var validatenewPassEdit=(rule, value, callback) =>{
          if (value === '') {
            callback(new Error('请输入新密码'));
          } else if (value !== this.ruleForm2.oldPassEdit) {
            callback(new Error('新密码和旧密码不一致!'));
          } else {
            callback();
          }
      }
      return {

        check:"",//记住密码选取的状态
        PasswordEyeDiv:false,//密码 眼睛图片的状态  默认隐藏
        passwordEye:"password",//密码默认为不可见
        eyeShowPassword:true,//密码 显示隐藏密码的眼睛图片的状态  默认为eye_open
        identifyCodes: "1234567890",//初始值
        identifyCode: "",//验证码初始值
        logo:{login_logo},//logo图
        //示隐藏密码的眼睛图片
        eye:{
          eye_open, eye_close
        },
        //login的样式
        showLogoOrEdit:true,//登录和修改密码页面的显示和隐藏  默认为true 为登录页
        logining: false,
        ruleForm2: {
          //登录的参数
          account: '',
          checkPass: '',
          code:'',
          //修改密码的参数
          accountEdit:'',
          oldPassEdit:'',
          newPassEdit:'',
        },
        rules2: {
          //登录正则
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          code: [
           { validator: validateCode, trigger: 'blur'}
          ],

          //修改密码正则
          accountEdit: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          oldPassEdit: [
            { required: true, message: '请输入旧密码',trigger: 'blur'},
            { min: 6, max:10,  message: '长度在 6到 10 个字符', },
            { validator: validateoldPassEdit, trigger: 'blur'}
          ],
          newPassEdit: [
            { required: true, message: '请输入新密码',trigger: 'blur'},
            { min: 6, max:10,  message: '长度在 6到 10 个字符', },
             { validator: validatenewPassEdit, trigger: 'blur'}
          ]
        },
        checked: true
      };
    },
    methods: {
      jumpMain(token){
        console.log('jumptomain')
        this.$store.commit('login',token);
        this.$router.push({ path: '/' });
      },
      //登录
      handleSubmit2(ev) {
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            let loginParams =  {
                username: this.ruleForm2.account,
                password: this.ruleForm2.checkPass
            };
            let loginToken = 'Basic Y21ueS1jbGllbnQtdWFjOmNtbnlDbGllbnRTZWNyZXQ=';
            this.$postForm('uac/auth/form',loginParams,loginToken).then(response => {
              console.log(response);
              this.logining = false;
              this.jumpMain("Bearer "+response.access_token);
            })
          }
        });


      },
      //设置cookie值
      setCookie(c_name, c_pwd, exdays) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "userName"+c_name + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "userPwd"+c_name + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
      },
      //清除cookie值
      clearCookie: function(name) {
        this.setCookie(name, "", -1); //修改2值都为空，天数为负1天就好了
      },

      //enter回车登录
      enterLogin(ruleForm2){
        this.handleSubmit2()
      },

      //点击账号框聚焦  密码眼睛图片隐藏
      focusAccount(){
        this.PasswordEyeDiv=false;
      },

      //点击密码框聚焦  密码眼睛图片显示
      focusShowPasswordEye(){
        this.PasswordEyeDiv=true;
      },

      //点击验证码聚焦  密码眼睛图片隐藏
      focusCode(){
        this.PasswordEyeDiv=false;
      },

      //点击密码可见眼睛图片  使密码显示和隐藏
      changePassword(value){
        console.log(value);
        if(value=='show'){
          this.passwordEye="text";
          this.eyeShowPassword=false;
        }else{
          this.passwordEye="password";
          this.eyeShowPassword=true;
        }
      },
      //点击忘记密码  修改密码页面显示  登录页隐藏
      gotoEdit(){
        setTimeout(()=>{
          this.showLogoOrEdit=false;
          this.ruleForm2.accountEdit="";
          this.ruleForm2.oldPassEdit="";
          this.ruleForm2.newPassEdit="";
        },300)
      },

      //点击去登录   登录页显示   修改密码隐藏
      gotoLogo(){
        setTimeout(()=>{
          this.showLogoOrEdit=true;
          this.logining = false;
        },300)
      },
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
          ];
        }
        console.log(this.identifyCode);
      }

    },mounted() {
      // this.getCookie();
      this.ruleForm2.account=this.$route.params.username;
      this.ruleForm2.checkPass=this.$route.params.password;//退出登录后获取cookie的值，将用户名和密码赋给input框
      this.check=this.$route.params.check;//记住密码框的状态
      console.log(this.ruleForm2.account,this.ruleForm2.checkPass,this.check);
      this.identifyCode = "";//清空
      console.log('mounted');
      this.makeCode(this.identifyCodes, 4);//获取新的验证码
    },
    created() {
        var _self = this;
        document.onkeydown = function(e){
          if(window.event == undefined){
            var key = e.keyCode;
          }else{
            var key = window.event.keyCode;
          }
          if(key == 13){
            _self.enterLogin('ruleForm2');
          }
        }
    },
    //vue中由于页面刷新会导致有些参数被清空，用localStorage存储数据一般是在 beforeMount() 挂载前取， beforeUpdate() 更新渲染时存
    //JSON.parse 转换一下类型   存储 记住密码checkbox的状态 true  false
    updated() {
       localStorage.setItem("check"+this.ruleForm2.account,this.check);
    },
    components:{SIdentify} //注册组件
  }

</script>
<style lang="scss" scoped>
  .login{
    position: relative;
    backgroundImage: "url(" + require("@/assets/login_bg.png") + ")";
    background-repeat:  "no-repeat";
    backgroundSize: "100% 100%";
    width:"100%";
    height:"100%";
  }
  
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin:auto;
    width: 350px;
    position: absolute;
    top:150px;
    right:150px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
  .login-img{
    width:100%;
    height:80px;
    line-height:80px;
    position: absolute;
    top:-20px;
    background:#fff;
  }
  .bottom-title{
    width:100%;
    position: absolute;
    bottom:0px;
    margin: 5px 0;
    text-align:center;
  }
  .refreshCode:hover{
    color:rgb(231, 76, 15);
    cursor: pointer;
    transition: 0.3s;
  }
  .remidpassword:hover{
    color:rgb(231, 76, 15);
    cursor: pointer;
    transition: 0.3s;
  }
  .noresiger:hover{
    color:rgb(231, 76, 15);
    cursor: pointer;
    transition: 0.3s;
  }
  /deep/ .code{
    height:28px !important;
    line-height: 25px;
  }
</style>