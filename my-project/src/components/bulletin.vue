<template>
  <div class="bulletin">
    <div class="Cbody">
      <div class="bulletin_menu" :style="{backgroundColor:notice.bgColor}">
        <img class="menu_img" src="http://www1.xiaoniren.cn/upload/attachment/5/130/201806/15281013343181.png" alt="">
        <span class="menu_test">{{notice.content}}</span>
      </div>
    </div>
    <div class="Bulright">
            <!-- 侧边栏 操作系统 -->
            <div class="Sdianzhao"><i></i><span>公告设置</span></div>
            <div class="Swcaozuo" v-if="Sitype">
                <span class="Span" style="margin-top:0px">模块配置：</span>
                <div class="SwLunbo" style="width:140px">
                    <span class="YesNoLb" style="marginRight:6px">是否显示</span>
                    <div class="YesNo">
                        <span class="Yes" :class="BiynMK ? 'pitch' : '' "  @click="SiYesMK()">是</span>
                        <span class="No" :class="!BiynMK ? 'pitch' : '' "  @click="SiNoMK()">否</span>
                    </div>
                </div>
            </div>
            <div class="Sshangcheng">
                <span class="shangchengname">公告名称：</span>
                <el-input class="shurukuang" v-model="input" @change="gaibian" :maxlength="30" placeholder="最多可输入30个字"></el-input>
            </div>
            <div class="Sshangcheng">
                <span class="scnamecolor">颜色修改：</span>
                <el-color-picker class="yanse" v-model="notice.bgColor" @change="BulColor"></el-color-picker>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  name:'bulletin',
  props:{
    notice:Object
  },
  data() {
      return {
        Sitype: true,
        input: '',
        BiynMK: true,
      }
  },
  mounted:function () {
    this.BiynMK = this.notice.display
  },
  methods: {
    SiYesMK () {
        this.BiynMK = true
        var Show = true
        this.$emit('BuShowHide',Show)
    },
    SiNoMK () {
        this.BiynMK = false
        var Hide = false
        this.$emit('BuShowHide',Hide)
    },
    BulColor(c) {
      this.notice.bgColor = c
      this.$emit("bgColor",c)
    },
    gaibian (e) {
      this.notice.content = e || '重大消息重大消息'
      this.$emit("content",e)
    }
  }
}
</script>

<style>
.bulletin {
    width: 100%;
    height: 40px;
}
.bulletin_menu {
  width: 97%;
  margin-left: 3px;
  margin-top: 10px;
  height: 20px;
  border-radius: 5px;
  position: relative;
}
.menu_img {
  width: 15px;
  height: 15px;
  position: absolute;
  top: 2px;
  left: 3px;
}
.menu_test {
  white-space: nowrap;
  color: #fff;
  font-size: 12px;
  margin-left: 25px;
　overflow:-webkit-marquee;
　-webkit-marquee-direction:left;
　-webkit-marquee-speed:normal;
　-webkit-marquee-style:scroll;
　-webkit-marquee-repetition:infinite;
}
.Bulright {
  display: none;
  font-size: 14px;
  color: #666;
  width: 599px;
  height: 250px;
  cursor: default;
  position: fixed;
  left: 34%;
  top: 8px;
  padding: 28px 17px 15px 17px;
  text-align: left;
  background: #f8f8f8;
  border-radius: 5px;
  border: 1px solid #d1d1d1;
  z-index: 1999;
  overflow: auto;
}
</style>
