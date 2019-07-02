import axios from "axios";

import {Message} from 'element-ui'
import Qs from 'qs'

//设置超时时间
axios.defaults.timeout = 10*1000;
// 解决axios发送预请求问题，默认是非简单请求需要变为简单请求
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

//var baseURL = 'http://47.100.78.154:7009/';
var baseURL = 'http://192.168.1.100:7009/';//后台本地测试数据

//暴露url给其他位置使用
export {
    baseURL
}

//封装post请求,
//可以不用传递token ,不传则使用默认的token
export default function postForm(url,paramData,token,type) {
    if (token == null || token == '') {
        token = localStorage.getItem('token');
    }
    if(type!=null && type == 'json'){
        return new Promise((resolve,reject) => {
            axios({
                method: 'post',
                url: baseURL+url,
                headers:{
                    'Content-type': 'application/json',
                    'Authorization':token
                },
                // transformRequest: [function(data) {
                //     // data = JSON.stringify(data)
                //     // return Qs.stringify(data)
                //     return JSON.stringify(data)
                // }],
                params:{},
                data:paramData
            }).then(response =>{
                console.log(response);
                if (response.data.code == 200){
                    resolve(response.data.result);
                }else{
                    reject(response.data);
                    // Message.error({message:"请求异常"});
                }
            }).catch(error => {
                console.log(error.response);
                console.log(error.response.status);
                if (error.response.data.message) {
                    Message.error({message: error.response.data.message});
                } else {
                    Message.error({message: '服务器异常'})
                }
            })
        })
    }else{
        return new Promise((resolve,reject) => {
            axios({
                method: 'post',
                url: baseURL+url,
                headers:{
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Authorization':token
                },
                params:paramData
            }).then(response =>{
                console.log(response);
                if (response.data.code == 200){
                    resolve(response.data.result);
                }else{
                    reject(response.data);
                    // Message.error({message:"请求异常"});
                }
            }).catch(error => {
                console.log(error.response);
                console.log(error.response.status);
                if (error.response.data.message) {
                    Message.error({message: error.response.data.message});
                } else {
                    Message.error({message: '服务器异常'})
                }
            })
        })
    }
}

//post请求上传json字符串
export function getRequset(url,paramData){
    

}


