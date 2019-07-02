<template>
  <section class="old-wrapper">
    <!--工具条-->
		<el-col :span="24" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item class="someWidth">
					<el-input v-model.trim="filters.oldName" placeholder="姓名" @keydown.native="enterSearch" ></el-input>
				</el-form-item>
        <el-form-item>
          <el-select v-model.trim="filters.sex" placeholder="请选择" clearable style="width:100%;">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
				<el-form-item class="header-margin">
					<el-button type="primary" icon="el-icon-search">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-circle-plus-outline" >新增</el-button>
				</el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-refresh" >刷新</el-button>
        </el-form-item>
			</el-form>
		</el-col>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column 
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="showDetail(scope.$index, tableData)"
              size="small">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>

  </section>
</template>
<script>

import bus from '../../vuex/eventBus'

export default {    
  name: "admissionList",
  data() {
    return {
      filters: {
					oldName: '',
          sex:'',
          pageNo:""+1,
          pageSize:'10'
      },
      options2: [{
          value: '1',
          label: '男'
          }, {
          value: '2',
          label: '女',
          }],
      tableData: [
      ]
    };
  },
  methods: {
    showDetail() {
      // 先删除keep-alive缓存,然后在跳转
      console.log('showDetail')
      bus.$emit('homePage',{type:'jump',path:'/admissionOperation',id:'12',title:'入院详情'});
      //  this.$router.push({ path: '/admiOperation' });
    },
    //获取列表的老人数据
    getTableList(){
        this.$postForm('omc/OldmanCheckIn/showAll',this.filters,'','json').then(res =>{
          console.log(res);
        })


    }

  },
  mounted() {
    this.getTableList();
  }
};
</script>

