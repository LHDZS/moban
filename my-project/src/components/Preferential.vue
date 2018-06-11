<template>
  <div class="preferential" v-if="PrShowHide">
    <div class="Preber">
        <div class="YHJ1" v-if="PreImg == 1">
            <img class="youhuijuan1"  src="http://www1.xiaoniren.cn/upload/attachment/5/130/201804/15248207109243.png" alt="">
            <div class="clear"></div>
        </div>
        <div class="YHJ1" v-if="PreImg == 2">
            <img class="youhuijuan2"  src="http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15254803843941.png" alt="">
            <img class="youhuijuan2"  src="http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15254803843941.png" alt="">
            <div class="clear"></div>
        </div>
        <div class="YHJ1" v-if="PreImg == 3">
            <img class="youhuijuan3"  src="http://www1.xiaoniren.cn/upload/attachment/5/130/201804/15248210497704.png" alt="">
            <img class="youhuijuan3"  src="http://www1.xiaoniren.cn/upload/attachment/5/130/201804/15248210497704.png" alt="">
            <img class="youhuijuan3"  src="http://www1.xiaoniren.cn/upload/attachment/5/130/201804/15248210497704.png" alt="">
            <div class="clear"></div>
        </div>
    </div>
    <div class="Prright">
        <div class="Sdianzhao"><i></i><span>优惠券设置</span></div>
        <div class="Swcaozuo" v-if="Prtype">
        <span class="Span" style="margin-top:0px">模块配置：</span>
            <div class="SwLunbo" style="width:140px">
                <span class="YesNoLb" style="marginRight:6px">是否显示</span>
                <div class="YesNo">
                    <span class="Yes" :class="PrynMK ? 'pitch' : '' "  @click="PrYesMK()">是</span>
                    <span class="No" :class="!PrynMK ? 'pitch' : '' "  @click="PrNoMK()">否</span>
                </div>
            </div>
        </div>
        <div class="Pref_fengge">
            <span class="Span">排列风格：</span>
            <div class="Prefenggexuanze" >
                <div class="Pigeshu" v-for="(item,index) in yhxz" :key="index" @click="geshu(item.id,index)">
                    <div class="Pfdiv" :class="Preindex == index ? 'pitchimg' : ''">
                        <img class="Pfgimg" :src="item.img" alt="">
                        <img class="Pfduigou" v-if="Preindex == index" src="http://www1.xiaoniren.cn/js/plugins/ueditor/dialogs/image/images/success.png" alt="">
                    </div>
                    <span>{{item.pap}}</span>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'preferential',
  props: {
      color: String,
      Appid: Number,
      PrShowHide: Boolean,
      Prtype: Boolean,
      PrynMK: Boolean
  },
  data () {
      return {
        Preindex: 0,
        PreImg: 1,
        ceshi: [],
        youhuiyangshi: 'youhuijuan1',
        lingqu: 'liji',
        num: 1,
        height: 65,
        yhxz: [
          {name:'youhuijuan1', id:1,pap:'一列',lingqu:'liji',img:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15254804789786.jpg'},
          {name:'youhuijuan2',id:2,pap:'双列',lingqu:'liji',img:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15254804847298.jpg'},
          {name:'youhuijuan3',id:3,pap:'三列',lingqu:'liji2',img:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15254804889866.jpg'},
        ]
      }
  },
  mounted:function() {
      
  },
  methods: {
    PrYesMK () {
        this.PrynMK = true
        var Show = true
        this.$emit('PrShowHide',Show)
    },
    PrNoMK () {
        this.PrynMK = false
        var Hide = false
        this.$emit('PrShowHide',Hide)
    },
    youh(i) {
      this.$emit('youhui',i)
    },
    geshu (id,index) {
      this.PreImg = id
      this.Preindex = index  
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
}
.Preber {
    border: 1px solid #fff;
}
.Preber:hover {
  cursor: move;
  border-left: 1px dashed #409EFF;
  border-right: 1px dashed #409EFF;
  border-top: 1px solid #409EFF;
  border-bottom: 1px solid #409EFF;
}
.YHJ1 {
    width: 100%;
    height: 60px;
    box-sizing: border-box;
}
.youhuijuan1 {
  width: 100%;
  height: 60px;
  padding: 2px;
  box-sizing: border-box;
  float: left;
}
.youhuijuan2 {
  width: 50%;
  height: 60px;
  padding: 2px;
  box-sizing: border-box;
  float: left;
}
.youhuijuan3 {
  width: 33.33333%;
  height: 60px;
  padding: 2px;
  box-sizing: border-box;
  float: left;
}
.youhuijuan {
    padding: 5px;
    font-size: 14px;
    font-weight: bold;
    position: relative;
}
.youhui {
    width: 90%;
    margin: 0 auto;
    border: 1px solid red;
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
    left: 0px;
    text-align: left;
    margin-left: 3px;
    width: 90%;
    font-size: 10px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
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
}
.liji2 {
  color: #fff;
  background-color: red;
  width: 100%;
  height: 20px;
  font-size: 5px;
  position: absolute;
  left: 0;
  bottom: 0;
  overflow: hidden;
}
.Prright {
  display: none;
  font-size: 14px;
  color: #666;
  width: 599px;
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
}
input {
  width: 180px;
  margin-bottom: 5px;
  text-indent:1em;
  color: #999;
  border-radius: 5px;
  border:1px solid #DBDBDB;
}
.Pref_fengge {
    width: 100%;
}
.Prefenggexuanze {
    width: 400px;
    float: left;
}
.Pfdiv {
    width: 100%;
    position: relative;
    border: 2px solid #ccc;
}
.pitchimg {
    width: 100%;
    border: 2px solid #1094fa;
}
.Pfduigou {
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>