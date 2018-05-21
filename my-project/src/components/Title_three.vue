<template>
  <div class="TitleThree">
    <div>
      <h1><span ref="title">{{title ? title : '商品列表'}}</span></h1>
    </div>
    <!-- <div class="right">
      <el-input size="mini" placeholder="请输入标题" @blur="biaot" clearable></el-input>
      <div class="array"></div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'Title',
  data () {
    return {
      title:'商品列表'
    }
  },
  methods: {
    biaot(err) {
      // console.log(err.target.value)
      this.title = err.target.value

      this.$emit('titl1',this.title)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.TitleThree {
  width: 100%;
  height: 64px;
}
  h1 {
    padding: 18px 60px 0 60px;
    height: 46px;
    line-height: 46px;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    background: url(../assets/title.png) no-repeat;
    background-size: 100% 100%;
    margin: 0;
  }
  span{
    display: inline-block;
    height: 46px;
    width: 150px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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