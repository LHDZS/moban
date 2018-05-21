<template>
    <div class="moduletwo">
        <ul class='modul'>
            <li class="modli" :class="ky == key ? 'mor' : ''" @click="xuanzhong(key)" v-for="(item,key) in list" :key="key">{{item.name}}</li>
        </ul>
        <div class="moright" id="top" @scroll="handleScroll">
            <div class="Mboot" v-for="(item,key) in list" :key="key">
                <div class="Mname">{{item.name}}</div>
            <div class="Mblock"  v-for="(value,index) in items" :key='index'>
                <img class="mimg" :src="http + value.thumb" alt="">
                <div class="mright">
                    <div class="m_name">{{value.name}}</div>
                    <span class="m_price">￥{{value.price}}<i class="dai">/袋</i></span>
                    <i class="m_img">
                        <img class="mi_img" src="../../image/tianjia.png" alt="">
                    </i>
                </div>
            </div>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script src="https://cdn.staticfile.org/jquery/1.12.4/jquery.min.js"></script>
<script type="text/javascript">
import {https,Goodss,GoodssCategory} from '../assets/BaseApi'

export default {
  name:'moduletwo',
  data() {
     return {
         zise:[],
         list:[
             {name:'分类1',id:'1'},
             {name:'分类2',id:'2'},
             {name:'分类3',id:'3'},
             {name:'分类4',id:'4'},
             {name:'分类5',id:'5'},
             {name:'分类6',id:'6'},
             {name:'分类7',id:'7'},
         ],
         items:[
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'1',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'1',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'1',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'2',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'3',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'4',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'5',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'6',price:'999.99'},
             ],
         ky: 0,
         scrollTop: 4,
         http:''
     }
  },
  mounted:function () {
      this.ky = 0
      this.handleScroll()
  },
  methods: {
      xuanzhong(key) {
        this.ky = key
        let nametop = document.getElementsByClassName('Mname')
        let docuntop = document.getElementById('top').scrollTop
        for (var k in nametop) {
            if (this.ky == k) {
                document.getElementById('top').scrollTop = nametop[k].offsetTop
            }
        }
      },
    //   ajax() {
    //     var _this = this
    //     this.$ajax.get(GoodssCategory, {
    //         params: {
    //         merchant_id : 130,
    //         type : 0,
    //         }
    //     })
    //     .then(function (res) {
    //         let dd = {}
    //         var dait = res.data.data.items
    //         for (var k in dait) {
    //             if (dait[k].level == 1) {
    //                 _this.zise.push(dait[k])
    //             }
    //         }
    //     })
    //     .catch(function (err) {
    //         console.log(err);
    //     });
    //   },
    //   shangpin () {
    //         var _this = this
    //         this.$ajax.get(Goodss, {
    //             params: {
    //             merchant_id : 130,
    //             page : 1,
    //             per_page : 100
    //             }
    //         })
    //         .then(function (res) {
    //             var data = res.data.data.items
    //             for (var i in data) {
    //                 for (var j in _this.zise) {
    //                     if (_this.zise[j].id == data[i].category_id) {
    //                         if (!_this.zise[j].arr) {
    //                             _this.zise[j].arr = []
    //                         }
    //                         _this.zise[j].arr.push(data[i])
    //                     }
    //                 }
    //             }
    //             _this.list = _this.zise
    //         })
    //         .catch(function (err) {
    //             console.log(err);
    //         });
    //     },
        // 滑动滚动
        // goAnchor(selector) {
        //     var anchor = this.$el.querySelector(selector)
        //     document.body.scrollTop = anchor.offsetTop
        //     console.log(document.body.scrollTop)
        // },
        handleScroll(e){
            let nametop = document.getElementsByClassName('Mname')
            let docuntop = document.getElementById('top').scrollTop
            for (var i=0;i<nametop.length;i++) {
                if (nametop[i] != nametop.length-1) {
                    if (docuntop > nametop[i].offsetTop && docuntop < nametop[i+1].offsetTop) {
                         this.ky = i
                    }
                }else{
                    if ( docuntop <= nametop[i].offsetTop) {
                        this.ky = i
                    }
                }
            }
        }
  }
}
</script>

<style>
    .moduletwo{
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #f3f3f3;
    }
    .moright::-webkit-scrollbar {display:none}
    .clear{ clear:both} 
    .modul {
        width: 20%;
        height: 100%;
        float: left;
        list-style:none;
        padding: 0;
        margin: 0;
        overflow: auto;
        border-right: 2px solid #e0e0e0;
    }
    .modul::-webkit-scrollbar {display:none}
    .modli {
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        text-align: center;
        cursor:default;
        box-sizing:border-box;
    }
    .mor {
        width: 105%;
        color: #5082B7;
        border-top: 2px solid #e0e0e0;
        border-bottom: 2px solid #e0e0e0;
        border-right: 2px solid #fff;
        background-color: #fff;
    }
    .moright {
        width: 79%;
        height: 100%;
        overflow:auto;
        float: right;
        background-color: #fff;
    }
    .Mboot {
        width: 97%;
    }
    .Mblock {
        width: 100%;
        height: 80px;
        background-color: #fff;
        padding-top: 5px;
        padding-left: 6px; 
    }
    .Mname {
        width: 97%;
        height: 20px;
        font-size: 14px;
        text-align: left;
        font-weight: normal;
        border-bottom: 1px solid #ccc;
        padding: 7px; 
    }
    .mitem {
        float: left;
        width: 97%;
        height: 80px;
        line-height: 80px;
        margin: 2px;
        box-sizing: border-box;
        border-bottom: 1px solid #f1f1f1;
    }
    .mimg {
        width: 35%;
        height: 100%;
        background-image: url('../assets/shili.jpg');
        background-size: 100%;
        float: left;
    }
    .mright {
        width: 60%;
        height: 90%;
        margin: 5px;
        float: right;
        position: relative;
    }
    .m_name {
        width: 100%;
        height: 20px;
        line-height: 20px;
        position: absolute;
        top: 5px;
        left: 5px;
        overflow: hidden;/*超出部分隐藏*/
        white-space: nowrap;/*不换行*/
        text-overflow:ellipsis;/*超出部分文字以...显示*/
    }
    .m_price {
        height: 20px;
        line-height: 20px;
        position: absolute;
        bottom: 15px;
        left: 5px;
        font-size: 12px;
        color: #2eca3a;
    }
    .m_img {
        width: 25px;
        height: 25px;
        line-height: 25px;
        position: absolute;
        bottom: 5px;
        right: 5px;
    }
    .mi_img {
        width: 100%;
        height: 100%;
    }
    .dai {
        color: #ccc;
        font-size: 10px;
    }
</style>