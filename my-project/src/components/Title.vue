<template>
  <div class="Title">
    <div class="titdiv" :style="{backgroundColor:color}">
      <div class="titleft">
        <i class="iI"><img class="Iimg" src="../../image/xinhao.png" alt="" ondragstart='return false;'></i>
        <span class="tigspan">中国联通</span>
      </div>
      <div class="titcon">12:00</div>
      <div class="titright">
        <span class="tigspan">80%</span>
        <i class="Ii"><img class="Iimg" src="../../image/dianchi.png" alt="" ondragstart='return false;'></i>
      </div>
      <span class="titispan" :style="{backgroundColor:color}">
        <i><img class="Iimg" src="../../image/gengduo.png" alt="" ondragstart='return false;'></i>
        <i></i>
        <i><img class="Iimg" src="../../image/quanzi.png" alt="" ondragstart='return false;'></i>
        </span>
      <h1 :style="{color:colorz}">{{dats ? dats : '店铺首页'}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
      color:String,
      colorz:String,
      showhide:Boolean,
      title:String
    },
  data () {
    return {
      dats:'',
      visible: true,
    }
  },
  watch: {
        title(newVal){
            this.dats = this.title
        }
  },
  mounted:function() {
    this.dats = this.title
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .titright {
    position: absolute;
    top: 0;
    right: 5px;
    float: left;
  }
  .tigspan {
    display: inline-block;
    font-size: 8px;
    color: #fff;
    margin-top: 5px;
  }
  .titleft {
    position: absolute;
    top: 0;
    left: 5px;
  }
  .titdiv {
    width: 100%;
    height: 64px;
    background-color: #000;
    position: relative;
    border: 1px solid #fff;
    box-sizing:border-box;
  }
  .titdiv:hover{
    cursor: move;
    border-left: 1px dashed #409EFF;
    border-right: 1px dashed #409EFF;
    border-top: 1px solid #409EFF;
    border-bottom: 1px solid #409EFF;
  }
  .titcon {
    font-size: 12px;
    color: #fff;
    padding-top: 5px;
  }
  .titispan {
    position: absolute;
    bottom: 10px;
    right: 5px;
    padding: 2px 2px;
    border-radius: 30px;
    border: 1px solid #ccc;
    background-color: #000;
    color: #fff;
  }
  h1 {
    display: inline;
    padding-top: 20px;
    line-height: 50px;
    font-size: 13px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    /* background: url(../assets/title.png) no-repeat; */
  }
  i {
    width: 20px;
    height: 20px;
    float: left;
  }
  .Ii {
    width: 25px;
    height: 25px;
    float: right;
  }
  .iI {
    width: 25px;
    height: 25px;
    float: left;
  }
  .Iimg {
    display: inline-block;
    width: 100%;
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