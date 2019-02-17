<template>
  <div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <!-- 小球动画 -->
      <div class="ball" v-show="ballflag" ref="ball"></div>
    </transition>

    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :banners="banners"></swiper>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">￥{{ goodsinfo.sell_price }}</span>
          </p>
          <div class="numbox">
            <span class="title">购买数量：</span>
            <input
              @click="buyCount >= 2 && buyCount--"
              type="button"
              value="-"
              :disabled="buyCount == 1"
            >
            <input @change="filterMaxCount" v-model="buyCount" type="number" class="btn">
            <input
              @click="buyCount < goodsinfo.stock_quantity && buyCount++"
              type="button"
              value="+"
              :disabled="buyCount == goodsinfo.stock_quantity"
            >
          </div>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
            <!-- 分析： 如何实现加入购物车时候，拿到 选择的数量 -->
            <!-- 1. 经过分析发现： 按钮属于 goodsinfo 页面， 数字 属于 numberbox 组件 -->
            <!-- 2. 由于涉及到了父子组件的嵌套了，所以，无法直接在 goodsinfo 页面zhong 中获取到 选中的商品数量值-->
            <!-- 3. 怎么解决这个问题：涉及到了 子组件向父组件传值了（事件调用机制） -->
            <!-- 4. 事件调用的本质： 父向子传递方法，子调用这个方法， 同时把 数据当作参数 传递给这个方法 -->
          </p>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time | dataFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      banners: [],
      id: this.$route.params.id,
      goodsinfo: {},
      buyCount: 1,
      ballflag: false
    };
  },
  methods: {
    getbanners() {
      this.$http.get("getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.banners = result.body.message;
        }
      });
    },
    getGoodsInfo() {
      this.$http.get("goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },
    filterMaxCount() {
      if (this.buyCount > this.goodsinfo.stock_quantity) {
        this.buyCount = this.goodsinfo.stock_quantity;
      }
    },
    addToShopCar() {
      this.ballflag = !this.ballflag;
      // console.log( this.ballflag)
    },
    goDesc(id) {
      this.$router.push("/home/goodsDesc/" + this.id);
    },
    goComment(id) {
      this.$router.push("/home/goodsComment/" + this.id);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;
      const ballPosition=this.$refs.ball.getBoundingClientRect();
      const badgePosition=document.getElementById('badge').getBoundingClientRect();
      const xDist=badgePosition.left-ballPosition.left
      const yDist=badgePosition.top-ballPosition.top
      // 获取小球的 在页面中的位置
      // const ballPosition = this.$refs.ball.getBoundingClientRect();
      // // 获取 徽标 在页面中的位置
      // const badgePosition = document
      //   .getElementById("badge")
      //   .getBoundingClientRect();

      // const xDist = badgePosition.left - ballPosition.left;
      // const yDist = badgePosition.top - ballPosition.top;
      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      // el.style.transition = "all 0.5s ease";
      el.style.transition = "all 0.5s cubic-bezier(.4,.4,.5,.6)";
      console.log(11);
      done();
    },
    afterEnter(el) {
      this.ballflag = !this.ballflag;
    }
  },
  created() {
    this.getbanners();
    this.getGoodsInfo();
  }
};
</script>
<style lang="less" >
.goodsinfo-container {
  background-color: #eee;
  // overflow: hidden;

  .numbox {
    display: flex;
    height: 50px;
    align-items: center;
    input {
      width: 30px;
      height: 30px;
      padding: 0;
      margin: 0;
      text-align: center;

      &[type="number"] {
        width: 30px;
        border-left: 0;
        border-right: 0;
        font-size: 12px;
        color: gray;
      }
    }
  }

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 146px;
  }
}
</style>
