<template>
  <div class="swipe">
      <el-carousel height="150px" :autoplay='autoplay'
       :indicator-position="indicatorposition ? '' : 'none'"
       :interval='interval'
       >
        <el-carousel-item v-for="(tag,key) in list" :key="key" v-if="key < 3">
            <img class="mtimgs" :src="tag.link" />
        </el-carousel-item>
      </el-carousel>
      <div class="right" v-if="showhide">
          <el-button type="success" @click="bo()" size="mini">是否自动轮播</el-button>
          <el-button type="success" @click="dian()" size="mini">显示隐藏小点</el-button>
          <div class="zhanwei">   </div>
          <span>轮播间隔</span>  <el-input-number v-model="interval" @change="handleChange" :step="1000" :min="0" :max="10000" size="mini" label="修改轮播速度后再次点击轮播生效"></el-input-number>
      <div class="array"></div>
    </div>
  </div>
</template>

<script>
export default {
    name:'swipe',
    props: {
        // sudu:Number,
        // auto:Boolean,
        // indi:Boolean,
        showhide:Boolean
    },
    data () {
        return {
            list: [
                { img: 'https://qiniu.epipe.cn/5456575529551388672?imageslim&imageView2/1/w/750/h/360' },
                { img: 'https://qiniu.epipe.cn/5430983074181545984?imageslim&imageView2/1/w/750/h/360' },
                { img: 'https://qiniu.epipe.cn/5464226412548325376?imageslim&imageView2/1/w/750/h/360' }
            ],
            interval:3000,
            autoplay:true,
            indicatorposition:true,
            http:'http://www1.xiaoniren.cn'
        }
    },
    // 挂载结束后
    mounted:function() {
        // this.interval = this.sudu
        // this.autoplay = this.auto
        // this.indicatorposition = this.indi
        this.ajax()
        this.datas()
    },
    methods: {
        datas () {
        var _this = this
        this.$ajax.get(this.http + '/weapp-config/setting')
        .then(function (res) {
            // 取值
            var data = res.data.ext.ext
            _this.indicatorposition =  data.swiper.dots || false
            _this.autoplay =  data.swiper.loop || false
            _this.interval = data.swiper.interval || _this.interval

            console.log(_this.indicatorposition)
            console.log(_this.autoplay)
            console.log(_this.interval)

            console.log('轮播图请求数据成功')
        })
        .catch(function (err) {
            console.log(err)
            console.log('失败了')
        });
        },
        bo () {
            this.autoplay = !this.autoplay;
            this.$emit('autoplay',this.autoplay)
        },
        dian () {
            this.indicatorposition = !this.indicatorposition
            this.$emit('indicatorposition',this.indicatorposition)
        },
        // 加减速度
        handleChange(value) {
            console.log(value);
            this.$emit('speed',value)
        },
        // 发送请求
        ajax () {
            var _this = this
            this.$ajax.get(this.http + '/restapi/wechat-focus', {
                params: {
                merchant_id : 130,
                type: 0
                }
            })
            .then(function (res) {
                _this.list = res.data.data
            })
            .catch(function (err) {
                console.log(err);
            });
        }

    }
}
</script>

<style>
    .swipe {
        position: relative;
        border: 1px solid #fff;
        box-sizing:border-box;
    }
    .swipe:hover {
        cursor: move;
        border-left: 1px dashed #409EFF;
        border-right: 1px dashed #409EFF;
        border-top: 1px solid #409EFF;
        border-bottom: 1px solid #409EFF;
    }
    .mtimgs {
        width: 100%;
        height: 100%;
    }
    .right {
        font-size: 14px;
        color: #666;
        width: 260px;
        position: absolute;
        right: -310px;
        top: 30px;
        padding: 12px 10px;
        min-height: 28px;
        background: #f8f8f8;
        border-radius: 5px;
        border: 1px solid #d1d1d1;
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
    .zhanwei {
        width: 100px;
        height: 10px;
    }
</style>
