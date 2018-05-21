<template>
<div class="Imageupload">
    <input id="wechatpage-icon" style="display:none" type="text">
    <div class="zhezhaoceng" v-if="shangchuan">
        <div class="picture">
            <div class="pictureTop">
                <span class="picTopSpan">我的图片</span>
                <div @click="guanbi1" class="guanbi">
                <i class="el-icon-error"></i>
                </div>
            </div>
            <div class="pictureCentre">
                <iframe id="attachment" width="100%" height="100%" style="border:none" src="/attachment/create?div=icon-div&input=wechatpage-icon&single=1"></iframe>
            </div>
            <div class="pictureBottom">
                <el-button @click="guanbi1" size="mini">取消</el-button>
                <el-button type="primary" @click="queren" size="mini">确认</el-button>
            </div>
        </div> 
    </div>
</div>
</template>

<script>
export default {
  name:'Imageupload',
  props: {
      shangchuan:Boolean
  },
  data () {
      return {

      }
  },
  mounted:function () {
  },
  methods: {
      queren () {
        var id = document.getElementById('wechatpage-icon')
        console.log(id)
        this.$emit('queren',id)
      },
      guanbi1 () {
          this.$emit('guanbi',this.shangchuan)
      }
  }
}
</script>

<style>
.zhezhaoceng {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2000;
}
.guanbi {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  z-index: 99999;
}
.guanbi:hover {
  color: #409EFF;
  background-color: #ccc;
  cursor: pointer;
}
.picture{
  width: 80%;
  max-height: 560px;
  overflow-y: auto;
  margin: 1px auto;
  background-color: #fff;
}
.pictureTop {
  width: 100%;
  height: 30px;
  background-color: #fff;
  position: relative;
  border-bottom: 1px solid #ccc;
  z-index: 2000;
}
.picTopSpan {
  float: left;
  font-size: 18px;
  margin-left: 15px;
}
.pictureCentre {
  width: 100%;
  height: 490px;
  overflow: auto;
}
.pictureBottom{
  width: 100%;
  height: 50px;
  text-align: center;
  background-color: #fff;
}
</style>
