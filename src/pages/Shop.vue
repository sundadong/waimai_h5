<template>
  <div class="app" ref="app">
    <section class="app-body">
      <div class="m-shop-item" ref="shopHeader">
        <img class="m-shop-bg" :src="shop.logo">
        <a>
          <img class="m-shop-logo" :src="shop.logo">
          <div class="m-shop-info">
            <h2 class="m-shop-name">{{shop.name}}</h2>
            <p class="m-shop-notice f-text-ellipsis">公告：{{shop.notice}}</p>
            <p style="margin-bottom: 0;"><span class="u-label u-label-primary">{{shop.deliveryType}}.约{{shop.deliveryTime}}分钟</span></p>
          </div>
        </a>
      </div>
      <div class="m-shop-activity" ref="shopActivity" @click="showToast">
        <span class="m-shop-activity-more">3个活动 <span class="u-icon icon-more"></span></span>
        <p><span class="u-label u-label-danger">减</span>满31减30，满93减59，满140减88</p>
        <p><span class="u-label u-label-warning">券</span>下单领取随机面额优惠券</p>
        <p><span class="u-label u-label-success">新</span>门店新客立减1元</p>
      </div>
      <div class="m-shop-nav" ref="shopNav">
        <a class="m-shop-nav-item" :class="{active: type === 'good'}" href="javascript:;" @click="type = 'good'">商品</a>
        <a class="m-shop-nav-item" :class="{active: type === 'evaluation'}" href="javascript:;" @click="type = 'evaluation'">评价</a>
        <a class="m-shop-nav-item" :class="{active: type === 'info'}" href="javascript:;" @click="type = 'info'">商家</a>
      </div>
      <div class="m-shop-main" ref="shopMain" style="height: 0;">
        <div class="m-shop-good" v-show="type === 'good'">
          <ul class="m-category-list m-shop-good-category">
            <li class="m-category-item active">
              <a href="javascript:;">主食</a>
            </li>
            <li class="m-category-item">
              <a href="javascript:;">盖浇饭系列</a>
            </li>
            <li class="m-category-item">
              <a href="javascript:;">小食饮料</a>
            </li>
            <li class="m-category-item">
              <a href="javascript:;">组合巨划算</a>
            </li>
            <li class="m-category-item">
              <a href="javascript:;">套餐很解渴</a>
            </li>
          </ul>
          <div class="m-shop-good-container" ref="goodContainer" @scroll="scrollGood">
            <h2 class="m-category-title">主食</h2>
            <ul class="m-good-list">
              <li class="m-good-item" v-for="good in goods" :key="good.id">
                <a href="javascript:;">
                  <img class="m-good-pic" :src="good.pic" :alt="good.title">
                  <div class="m-good-info">
                    <h3 class="m-good-title">{{good.title}}</h3>
                    <p class="f-text-muted">{{good.desc}}</p>
                    <p>月销{{good.volume}}份 好评率{{good.praiseRate}}</p>
                    <p class="f-clearfix">
                      <span class="f-fl f-text-danger">
                        <span class="m-good-price-symbol">¥</span>
                        <span class="m-good-price">{{good.price}}</span>
                      </span>
                      <span class="m-stepper f-fr">
                        <button v-if="good.number > 0" class="m-stepper-ctrl m-stepper-minus" @click="minusGood(good.id)"><span>-</span></button>
                        <input v-if="good.number > 0" class="m-stepper-input" type="number" v-model="good.number" readonly>
                        <button class="m-stepper-ctrl m-stepper-plus" @click="plusGood(good.id)"><span>+</span></button>
                      </span>
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <footer class="app-footer">
            <div class="m-shop-footer">
              <a class="m-shop-footer-cart" href="javascript:;">
                <span class="u-icon icon-cart"></span>
                <span v-show="total_number > 0" class="u-badge">{{total_number}}</span>
              </a>
              <div class="m-shop-footer-info">
                <p class="m-shop-footer-price">¥ 251.8</p>
                <p class="m-shop-footer-delivery f-text-muted">另需配送费5元</p>
              </div>
              <button class="u-btn u-btn-primary u-btn-lg btn-pay" href="javascript:;">立即结算</button>
            </div>
          </footer>
        </div>
        <div class="m-shop-evaluation" v-show="type === 'evaluation'">
          评价
        </div>
        <div class="m-shop-info" v-show="type === 'info'">
          商家信息
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import logo from '../assets/images/logo.png'

export default {
  name: 'shop',
  data () {
    return {
      type: 'good',
      shop: {
        logo: logo,
        name: '把愚便当(西溪店)',
        notice: '亲们觉得米饭不够使可以单点的以单点...',
        deliveryType: '蜂鸟配送',
        deliveryTime: 45
      },
      goods: [
        {
          id: 1,
          pic: 'https://dummyimage.com/120x120/eee/333',
          title: '土豆牛肉盖浇饭',
          desc: '五花肉卤肉白饭简单不平凡料理',
          volume: 1413,
          praiseRate: '97%',
          price: 29.0,
          number: 0
        },
        {
          id: 2,
          pic: 'https://dummyimage.com/120x120/eee/333',
          title: '土豆牛肉盖浇饭',
          desc: '五花肉卤肉白饭简单不平凡料理',
          volume: 1413,
          praiseRate: '97%',
          price: 29.0,
          number: 0
        },
        {
          id: 3,
          pic: 'https://dummyimage.com/120x120/eee/333',
          title: '土豆牛肉盖浇饭',
          desc: '五花肉卤肉白饭简单不平凡料理',
          volume: 1413,
          praiseRate: '97%',
          price: 29.0,
          number: 0
        },
        {
          id: 4,
          pic: 'https://dummyimage.com/120x120/eee/333',
          title: '土豆牛肉盖浇饭',
          desc: '五花肉卤肉白饭简单不平凡料理',
          volume: 1413,
          praiseRate: '97%',
          price: 29.0,
          number: 0
        },
        {
          id: 5,
          pic: 'https://dummyimage.com/120x120/eee/333',
          title: '土豆牛肉盖浇饭',
          desc: '五花肉卤肉白饭简单不平凡料理',
          volume: 1413,
          praiseRate: '97%',
          price: 29.0,
          number: 0
        },
        {
          id: 6,
          pic: 'https://dummyimage.com/120x120/eee/333',
          title: '土豆牛肉盖浇饭',
          desc: '五花肉卤肉白饭简单不平凡料理',
          volume: 1413,
          praiseRate: '97%',
          price: 29.0,
          number: 0
        },
        {
          id: 7,
          pic: 'https://dummyimage.com/120x120/eee/333',
          title: '土豆牛肉盖浇饭',
          desc: '五花肉卤肉白饭简单不平凡料理',
          volume: 1413,
          praiseRate: '97%',
          price: 29.0,
          number: 0
        },
        {
          id: 8,
          pic: 'https://dummyimage.com/120x120/eee/333',
          title: '土豆牛肉盖浇饭',
          desc: '五花肉卤肉白饭简单不平凡料理',
          volume: 1413,
          praiseRate: '97%',
          price: 29.0,
          number: 0
        },
        {
          id: 9,
          pic: 'https://dummyimage.com/120x120/eee/333',
          title: '土豆牛肉盖浇饭',
          desc: '五花肉卤肉白饭简单不平凡料理',
          volume: 1413,
          praiseRate: '97%',
          price: 29.0,
          number: 0
        },
        {
          id: 10,
          pic: 'https://dummyimage.com/120x120/eee/333',
          title: '土豆牛肉盖浇饭',
          desc: '五花肉卤肉白饭简单不平凡料理',
          volume: 1413,
          praiseRate: '97%',
          price: 29.0,
          number: 0
        }
      ]
    }
  },
  computed: {
    total_number () {
      return this.goods.reduce(function (total, num) {
        return total + num.number
      }, 0)
    }
  },
  mounted () {
    this.$nextTick(function () {
      const appHeight = this.$refs.app.offsetHeight
      // const shopHeaderHeight = this.$refs.shopHeader.offsetHeight
      // const shopActivityHeight = this.$refs.shopActivity.offsetHeight
      const shopNavHeight = this.$refs.shopNav.offsetHeight

      this.$refs.shopMain.style.height = appHeight - shopNavHeight + 'px'
    })
  },
  methods: {
    scrollGood () {
      console.log(this.$refs.goodContainer.scrollTop)
    },
    minusGood (id) {
      this.goods[id - 1].number--
    },
    plusGood (id) {
      this.goods[id - 1].number++
    },
    showToast () {
      this.$toast({
        message: 'hi, 这是提示！',
        duration: 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable';

.m-shop-item {
  position: relative;
  margin-bottom: 0;
  overflow: hidden;
}

.m-shop-bg {
  position: absolute;
  left: pxTorem(-30px);
  top: pxTorem(-30px);
  width: pxTorem(810px);
  filter: blur(30px);
}

.m-shop-item>a {
  position: relative;
  align-items: center;
  color: $bright-color;
  background-color: rgba(0, 0, 0, .3);
}

.m-shop-name {
  font-size: pxTorem(32px);
  color: $bright-color;
}

.m-shop-logo {
  width: pxTorem(160px);
  height: pxTorem(160px);
  border-radius: pxTorem(8px);
}

.m-shop-notice {
  max-width: pxTorem(520px);
}

.m-shop-activity {
  position: relative;
  height: pxTorem(80px);
  padding-left: pxTorem(20px);
  padding-right: pxTorem(20px);
  background-color: $bright-color;
  box-shadow: 0 pxTorem(1px) pxTorem(3px) rgba(0, 0, 0, .08);
  overflow: hidden;
}

.m-shop-activity p {
  margin-bottom: pxTorem(20px);
}

.m-shop-activity-more {
  position: absolute;
  top: pxTorem(20px);
  right: 0;
  color: $secondary-text-color;
}

.m-shop-nav {
  display: flex;
  background-color: $bright-color;
  border-bottom: 1px solid $border-color;
}

.m-shop-nav-item {
  position: relative;
  flex: 1 1 auto;
  padding: pxTorem(20px) pxTorem(50px);
  text-align: center;
}

.m-shop-nav-item.active {
  color: $primary-color;
}

.m-shop-nav-item:after {
  position: absolute;
  left: 50%;
  bottom: -1px;
  width: pxTorem(80px);
  content: "";
  border-top: pxTorem(4px) solid transparent;
  transform: translateX(-50%);
}

.m-shop-nav-item.active:after {
  border-color: $primary-color;
}

.m-shop-good {
  display: flex;
  height: 100%;
}

.m-shop-evaluation,
.m-shop-good-category,
.m-shop-good-container {
  height: 100%;
  background-color: $bright-color;
  overflow-x: hidden;
  overflow-y: auto;
}

.m-shop-good-category,
.m-shop-good-container {
  padding-bottom: pxTorem(98px);
}

.m-shop-good-category {
  width: pxTorem(160px);
  background-color: $bg-color;
}

.m-shop-good-container {
  flex: 1 1 auto;
  padding-left: pxTorem(20px);
  padding-right: pxTorem(20px);
}

.m-category-item>a {
  position: relative;
  display: block;
  padding: pxTorem(30px) pxTorem(20px);
  font-size: $small-font-size;
}

.m-category-item>a:after {
  position: absolute;
  bottom: 0;
  left: pxTorem(20px);
  right: pxTorem(20px);
  content: "";
  border-top: 1px solid $border-color;
}

.m-category-item.active>a {
  color: $primary-text-color;
  background-color: $bright-color;
}

.m-category-item.active>a:after {
  border-color: transparent;
}

.m-category-title {
  padding: pxTorem(20px) 0;
  font-size: $small-font-size;
  color: $primary-text-color;
  border-bottom: 1px solid $border-color;
}

.m-good-item {
  border-bottom: 1px solid $border-color;
}

.m-good-item>a {
  position: relative;
  display: flex;
  padding: pxTorem(20px) 0;
}

.m-good-pic {
  width: pxTorem(120px);
  height: pxTorem(120px);
  border-radius: pxTorem(5px);
}

.m-good-info {
  flex: 1 1 auto;
  padding-left: pxTorem(20px);
}

.m-good-info p+p {
  margin-top: pxTorem(5px);
}

.m-good-title {
  margin-bottom: pxTorem(8px);
  font-size: $subtitle-font-size;
  color: $primary-text-color;
}

.m-good-price-symbol {
  font-size: $extra-small-font-size;
}

.m-good-price {
  font-size: $title-font-size;
}

.m-shop-footer {
  display: flex;
  height: 100%;
  align-items: center;
  color: $bright-color;
  background-color: #00040A;
}

.m-shop-footer-cart {
  position: absolute;
  left: pxTorem(36px);
  bottom: pxTorem(22px);
  width: pxTorem(100px);
  height: pxTorem(100px);
  color: #fff;
  line-height: pxTorem(84px);
  text-align: center;
  background: linear-gradient(to right, #6DC3FF, #2894FF);
  border: pxTorem(8px) solid #00040A;
  border-radius: 50%;
}

.m-shop-footer-cart .u-icon {
  font-size: pxTorem(50px);
  margin-right: 0;
}

.m-shop-footer-cart .u-badge {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(35%, -40%);
}

.m-shop-footer-info {
  flex: 1 1 auto;
  padding-left: pxTorem(150px);
}

.m-shop-footer-price {
  font-size: $subtitle-font-size;
}

.m-shop-footer-delivery {
  font-size: $extra-small-font-size;
}

.m-good-item .m-stepper {
  margin-top: pxTorem(6px);
}

.btn-pay {
  width: pxTorem(248px);
  height: pxTorem(98px);
  font-size: $title-font-size;
  border: none;
  border-radius: 0;
}
</style>
