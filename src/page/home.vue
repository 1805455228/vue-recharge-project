<template>
  <div class="homepage-header">
    <ul class="homepage-header-tabs">
      <li class="header-tabs-item" v-for="(tab,index) in tabList" v-bind:key="'tab'+index">
          <div v-on:click="changeTab(index)" v-bind:class="[currentTab == index ? 'tabs-item-active':'']">{{tab}}</div>
      </li>
    </ul>
    <div>
        <input @input="getPhoneValue" class="homepage-input" type="text" v-model="message" placeholder="请输入如手机号码">
    </div>
    <ul class="homepage-goods-list">
      <li class="homepage-goods-item" v-for="(goods,index) in goodsList" :key="goods.goodsid" v-bind:class="[chooseGoodsId == index ? 'homepage-goods-active': '']">
        <div v-on:click="chooseGoods(index)">
          <div class="homepage-goods-title">{{goods.name}}</div>
          <div class="homepage-goods-text">{{goods.price}}</div>
        </div>
        <img v-if="goods.icon" class="homepage-goods-icon" :src="goods.icon" alt="icon">
      </li>
    </ul>
    <div class="homepage-footer-title">
      更多充值
    </div>
    <ul class="homepage-recharge-list">
      <li class="homepage-recharge-item" v-for="(video,index) in videoList" :key="index" v-on:click="chooseVideoType(index)">
        <!-- 路由跳转传参的方式之一 -->
        <router-link :to="{name:'video',params:{id:index}}">
					        <img class="homepage-recharge-icon" :src="video.icon" alt="icon">
					<div class="homepage-recharge-text">{{video.title}}</div>
				</router-link>
      </li>
    </ul>
    <Toast ref="toast" v-on:pushMsgFather="listen"/>
  </div>
</template>

<script>
import Toast from '../components/toast' //引入组件
import axios from 'axios'//用于请求接口 vue-resource插件官方不再维护
export default {
  name: 'HomePage',
  components:{
    // 注册组件
    Toast,
  },
  data () {
    return {
      message:'',
      tabList:['话费充值','流量充值'],
      currentTab:0,
      goodsList:[
        {
          icon:'https://file.gc.com.cn/backServerImage//mpic/20190207/20190207114852700356.png',
          name:'vip套餐',
          price:'$10',
          goodsid:1,
        },
        {
          icon:'',
          name:'vip套餐',
          price:'$10',
          goodsid:3,
        },
        {
          icon:'https://file.gc.com.cn/backServerImage//mpic/20190207/20190207114852700356.png',
          name:'vip套餐',
          price:'$10',
          goodsid:7,
        },
        {
          icon:'',
          name:'vip套餐',
          price:'$10',
          goodsid:9,
        },
      ],
      chooseGoodsId:-1,
      videoList:[
        {
          icon:'https://favicon.yandex.net/favicon/youku.com',
          title:'优酷视频会员',
        },
                {
          icon:'https://cambrian-images.cdn.bcebos.com/9fecbc8fd47aa0b42d163c0ab7374bda_1584928185071026.jpeg@w_100,h_100',
          title:'爱奇艺视频会员',
        },
                {
          icon:'https://favicon.yandex.net/favicon/qq.com',
          title:'腾讯视频会员',
        },
      ],
    }
  },
  mounted() {
    // 已经在config/index.js中设置代理域名(处理跨域)
    var url = '/fingerauth/share/getShare.html?v=1.2.7&source=com.redfinger.app&client=miniprogram&shareType=wx'
    axios.get(url).then(function(res){
      console.log(res);
    })
  },
  methods: {
    changeTab:function(id){
      console.log(`you choose id is : `,id);
      this.currentTab = id;
    },
    chooseGoods:function(id){
      // console.log(`you choose goods is : `,id);
      var phone = this.message;
      if(phone){
        // 只校验第一位为1 长度为11
        var phoneRegexp = /^1\d{10}$/
        // console.log(phone.match(phoneRegexp));
        if(phone.match(phoneRegexp)){
          this.$refs.toast.getParentParam('合法的手机号');//调用子组件的方法
          this.chooseGoodsId = id;
        }else{
          this.$refs.toast.getParentParam('请输入正确的手机号');
        }
      }else{
        this.$refs.toast.getParentParam('手机号不能为空');
      }
    },
    chooseVideoType:function(id){
      console.log(`choose video type is : `,id);
    },
    getPhoneValue:function(e){
      // 获取输入框内容
      let value = e.target.value;
      // console.log(value);
      if(value && value.length === 11){

      }else{
        this.chooseGoodsId = -1;
        // console.log('号码长度不合法');
      }
    },
    listen:function(text){
      console.log(text)
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.homepage-header-tabs{
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
  padding: 14px 0;
}
.header-tabs-item{
  flex: 1;
}
.tabs-item-active{
  color: #29b228;
}
.homepage-goods-list{
  display: flex;
  flex-wrap: wrap;
  margin-top:10px; 
}
.homepage-goods-item{
  position: relative;
  width: 30%;
  border:1px solid #29b228;
  border-radius: 6px;
  padding: 6px 1px;
  margin-left: 1.5%;
  margin-bottom: 6px;
  color: #29b228;
}
.homepage-goods-icon{
  position: absolute;
  top: 0;
  right: 0;
  width: 22px;
  height: 11px;
}
.homepage-goods-active{
  border: 1px solid red;
}
.homepage-goods-text{
  font-size: 14px;
  color: rgba(41, 178, 40, 0.6);
}
.homepage-input{
  width: 90%;
  padding: 20px 0;
  font-size: 18px;
  background: #f5f5f5;
  margin: 10px 5%;
  border-radius: 6px;
  text-indent:10px;
  font-weight: bolder;
}
.homepage-input::-webkit-input-placeholder{
  font-weight: bolder;
}
.homepage-footer-title{
  display: flex;
  padding-left: 10px;
  border-left: 5px solid #29b228;
  margin:10px 0 10px 10px; 
  font-weight: 400;
  color: #000;
}
.homepage-recharge-list{
  display: flex;
  padding: 10px;
  border-top: 1px solid #f5f5ff;
  border-bottom: 1px solid #f5f5ff;
}
.homepage-recharge-item{
  padding: 0 10px 0 0;
}
.homepage-recharge-icon{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.homepage-recharge-text{
  font-size: 10px;
}
</style>
