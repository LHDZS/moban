<template>
    <div class="tabheng">
        <!-- <div class="tabh" v-for="(items,keys) in list" :key="keys"> -->
            <!-- <input type="text" value="请输入"> -->
            <div class="itemh" v-for="(item,key) in list" :key="key">
                <img class="itemimg" :src="http + item.icon" alt="">
                <span class="itemsp">{{item.name}}</span>
                </div>
        <!-- </div> -->
        <div class="clear"></div>
    </div>
</template>

<script>
export default {
    name:'tabheng',
    data () {
        return {
            list: [
                {name:'萧炎',img:'http://image.uczzd.cn/13366432910906146051.jpg'},
                {name:'萧薰儿',img:'http://image.uczzd.cn/13366432910906146051.jpg'},
                {name:'彩鳞',img:'http://image.uczzd.cn/13366432910906146051.jpg'},
                {name:'小医仙',img:'http://image.uczzd.cn/13366432910906146051.jpg'},
                {name:'林动',img:'http://www.akjunshi.com/upload/20161109/14786821711392.jpg'},
                {name:'应欢欢',img:'http://www.akjunshi.com/upload/20161109/14786821711392.jpg'},
                {name:'凌青竹',img:'http://www.akjunshi.com/upload/20161109/14786821711392.jpg'},
                {name:'青檀',img:'http://www.akjunshi.com/upload/20161109/14786821711392.jpg'},
                {name:'牧尘',img:'http://upload.shunwang.com/2014/1028/1414465183739.jpg'},
                {name:'洛璃',img:'http://upload.shunwang.com/2014/1028/1414465183739.jpg'},
                {name:'九幽',img:'http://upload.shunwang.com/2014/1028/1414465183739.jpg'},
                {name:'牧云熙',img:'http://upload.shunwang.com/2014/1028/1414465183739.jpg'},
                {name:'周元',img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520853925230&di=f7cfde542141a68b9c014316278c7ade&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F77094b36acaf2edd402cf5a8861001e938019396.jpg'},
                {name:'苏幼薇',img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520853925230&di=f7cfde542141a68b9c014316278c7ade&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F77094b36acaf2edd402cf5a8861001e938019396.jpg'},
                {name:'夭夭',img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520853925230&di=f7cfde542141a68b9c014316278c7ade&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F77094b36acaf2edd402cf5a8861001e938019396.jpg'},
                {name:'吞吞',img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520853925230&di=f7cfde542141a68b9c014316278c7ade&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F77094b36acaf2edd402cf5a8861001e938019396.jpg'}
            ],
            http: 'https://www.xiaoniren.cn'
        }
    },
    mounted:function () {
      this.ajax()
  },
  methods: {
      ajax() {
        var _this = this
        this.list = []
        this.$ajax.get(this.http + '/restapi/goods-category', {
            params: {
            merchant_id : 130,
            type : 0,
            }
        })
        .then(function (res) {
            var dait = res.data.data.items
            for (var k in dait) {
                if (dait[k].level == 1) {
                    _this.list.push(dait[k])
                }
            }
        })
        .catch(function (err) {
            console.log(err);
        });
      },
  }
}
</script>

<style>
    .tabheng {
        width: 98%;
        padding: 10px 3px;
        height: 500px;
        overflow: auto;
        background-color: #f1f1f1;
        margin: 0;
    }
    clear{ clear:both} 
    .tabh {
        width: 100%;
        height: 100%;
    }
    .itemh {
        width: 49%;
        height: 75px;
        line-height: 75px;
        background-color: #fff;
        border-radius: 5px;
        margin: 1px;
        float: left;
    }
    .itemimg {
        width: 50%;
        height: 100%;
        background-image: url('../assets/shili.jpg');
        background-size: 100%;
        float: left;
    }
    .itemsp {
        width: 50%;
        height: 100%;
        float: right;
    }
</style>
