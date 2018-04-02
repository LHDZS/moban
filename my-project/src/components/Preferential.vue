<template>
  <div class="preferential">
    <div class="youhuijuan">{{youhui}}</div>
    <div class="youhui" :style="{borderColor:color}">
        <span class="you1" :style="{color:color}">{{you1}}</span>
        <span class="you2">{{you2}}</span>
        <span class="you3" :style="{color:color}">{{you3}}</span>
        <div class="liji" :style="{backgroundColor:color}">立即领取</div>
    </div>
    <!-- <div class="right">
      优惠名称：<input v-model="youhui" :change="youh(youhui)"/>
      优惠价格：<input v-model="you1" :change="youh(you1)"/>
      满减名称：<input v-model="you2" :change="youh(you2)"/>
      礼包名称：<input v-model="you3" :change="youh(you3)"/>
      <div class="array"></div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'preferential',
  props: {
      color: String
  },
  data () {
      return {
        youhui:'优惠券',
        you1:'5.00',
        you2:'满100.00可用',
        you3:'春节大礼包',
      }
  },
  methods: {
    youh(i) {
      this.$emit('youhui',i)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.preferential {
    margin: 0;
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    border: 1px solid #fff;
    box-sizing: border-box;
    min-height: 10px;
    position: relative;
    padding-bottom: 5px;
}
.preferential:hover {
  cursor: move;
  border-left: 1px dashed #409EFF;
  border-right: 1px dashed #409EFF;
  border-top: 1px solid #409EFF;
  border-bottom: 1px solid #409EFF;
}
.youhuijuan {
    padding: 5px;
    font-size: 14px;
    font-weight: bold;
}
.youhui {
    width: 90%;
    margin: 0 auto;
    border: 1px solid red;
    height: 65px;
    border-radius: 5px;
    position: relative;
}
.you1 {
    position: absolute;
    top: 5px;
    left: 5px;
    color: red;
}
.you2 {
    position: absolute;
    top: 30px;
    left: 5px;
    font-size: 10px;
}
.you3 {
    position: absolute;
    top: 45px;
    left: 5px;
    color: red;
    font-size: 10px;
}
.liji {
    color: #fff;
    background-color: red;
    float: right;
    width: 20px;
    height: 100%;
    font-size: 5px;
    overflow: hidden;
    /* border-radius: 5px;  */
}
.right {
  font-size: 14px;
  color: #666;
  width: 260px;
  position: absolute;
  right: -310px;
  top: 5px;
  padding: 12px 10px;
  min-height: 28px;
  background: #f8f8f8;
  border-radius: 5px;
  border: 1px solid #d1d1d1;
}
input {
  width: 180px;
  margin-bottom: 5px;
  text-indent:1em;
  color: #999;
  border-radius: 5px;
  border:1px solid #DBDBDB;
}
.array {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 7px 6px 0;
  border-color: transparent #d1d1d1 transparent transparent;
  position: absolute;
  left: -8px;
  top: 8px;
}
.array::after {
  content: "";
 width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 7px 6px 0;
  border-color: transparent #f8f8f8 transparent transparent;
  position: absolute;
  left: 2px;
  top: -6px;
}
</style>