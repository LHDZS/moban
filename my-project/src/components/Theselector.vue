<template>
    <div class="thesele">
        <div class="flex">
            <span class="Tspan">综合</span>
            <span class="Tspan">销量<i class="Tsi"><img class="Tsimgs" src="../../image/sjs.png" alt=""><img class="Tsimgx" src="../../image/sjxh.png" alt=""></i></span>
            <span class="Tspan">价格<i class="Tsi"><img class="Tsimgs" src="../../image/sjs.png" alt=""><img class="Tsimgx" src="../../image/sjxh.png" alt=""></i></span>
            <span class="Tspan"><div class="i"></div></span>
            <div class="clear"></div>
        </div>
    </div>
</template>

<script>
export default {
  name:'theselector',
  data () {
      return {

      }
  }
}
</script>

<style>
 .thesele {
     border-bottom: 1px solid #d6d6d6;
 }
 .flex {
     display: flex;
     flex:1;
 }
 .Tspan {
     width: 25%;
     height: 25px;
     line-height: 25px;
     font-size: 12px;
     font-weight: bold;
     text-align: center;
     padding: 0 7px;
 }
 .i {
     display: inline-block;
     margin-top: 4px;
     width: 15px;
     height: 15px;
     font-weight: bold;
     background-image: url('../../image/caidan.png');
     background-size:100% 100%;
 }
 .Tsi {
     display: inline-block;
     width: 10px;
     height: 20px;
     position: relative;
     float: right;
     margin-top: 2px;
 }
 .Tsimgs {
     position: absolute;
     top: 0;
     left: 0;
     width: 10px;
     height: 10px;
 }
 .Tsimgx {
     position: absolute;
     bottom: 0;
     left: 0;
     width: 10px;
     height: 10px;
 }
 /* .Tsimg {
     width: 15px;
     height: 15px;
 } */
</style>
