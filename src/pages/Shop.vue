<template>
  <div class="app" style="background-color: #fff;">
    <section class="app-body" ref="appBody" @scroll.passive="scrollGood">
      <div class="m-shop-item" ref="shopHeader">
        <div class="m-shop-mask">
          <img class="m-shop-bg" :src="shop.logo">
        </div>
        <div class="m-shop-box" @click="showToast">
          <img class="m-shop-logo" :src="shop.logo">
          <div class="m-shop-info">
            <h2 class="m-shop-name">{{shop.name}}</h2>
            <p style="color: #475669;">月销{{shop.volume}}  {{shop.deliveryType}}.约{{shop.deliveryTime}}分钟</p>
            <p class="m-shop-notice ydb-text-ellipsis" style="margin-bottom: 0;">公告：{{shop.notice}}</p>
            <div class="m-shop-activity">
              <span class="m-shop-activity-more">3个活动 <span class="ydb-icon ydb-icon-more"></span></span>
              <p><span class="u-tag u-tag-danger">减</span>满31减30，满93减59，满140减88</p>
              <p><span class="u-tag u-tag-warning">券</span>下单领取随机面额优惠券</p>
              <p><span class="u-tag u-tag-success">新</span>门店新客立减1元</p>
            </div>
          </div>
        </div>
      </div>
      <div class="m-shop-nav-box">
        <div class="m-shop-nav" ref="shopNav">
          <a class="m-shop-nav-item" :class="{active: type === 'good'}" href="javascript:;" @click="type = 'good'">商品</a>
          <a class="m-shop-nav-item" :class="{active: type === 'evaluation'}" href="javascript:;" @click="type = 'evaluation'">评价</a>
          <a class="m-shop-nav-item" :class="{active: type === 'info'}" href="javascript:;" @click="type = 'info'">商家</a>
        </div>
      </div>
      <div class="m-shop-main" ref="shopMain">
        <div class="m-shop-good" v-show="type === 'good'">
          <ul class="m-category-list m-shop-good-category" ref="goodCate">
            <li v-for="cate in cates" :key="cate.id" :data-id="cate.id" class="m-category-item" :class="{active: curCate === cate.id}" ref="cateItem" @click="selectedCate(cate.id)">
              <a href="javascript:;">{{cate.name}}
                <span v-show="cate.total > 0" class="u-badge">{{cate.total}}</span>
              </a>
            </li>
          </ul>
          <div class="m-shop-good-container" ref="goodContainer">
            <div v-for="cate in cates" :key="cate.id" ref="goodItem">
              <h2 class="m-category-title" :data-id="cate.id">{{cate.name}}</h2>
              <ul class="m-good-list">
                <li class="m-good-item" v-for="good in cate.goods" :key="good.id">
                  <a href="javascript:;">
                    <img class="m-good-pic" :src="good.pic" :alt="good.title">
                    <div class="m-good-info">
                      <h3 class="m-good-title">{{good.title}}</h3>
                      <p class="m-good-desc">{{good.desc}}</p>
                      <p>月销{{good.volume}}  好评率{{good.praiseRate}}</p>
                      <p class="ydb-clearfix">
                        <span class="ydb-fl ydb-text-danger">
                          <span class="m-good-price-symbol">¥</span>
                          <span class="m-good-price">{{good.price}}</span>
                        </span>
                        <span class="m-stepper ydb-fr">
                          <button v-if="good.number > 0" class="m-stepper-ctrl m-stepper-minus" @click="minusGood(cate.id, good.id)"><span>-</span></button>
                          <input v-if="good.number > 0" class="m-stepper-input" type="number" v-model="good.number" readonly>
                          <button class="m-stepper-ctrl m-stepper-plus" @click="plusGood(cate.id, good.id)"><span>+</span></button>
                        </span>
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <transition-group name="slide" tag="div">
            <div v-show="isShowCart" class="popup-mask" key="mask" @click="isShowCart = !isShowCart"></div>
            <div v-show="isShowCart" class="popup-cart" key="cart"></div>
          </transition-group>
          <footer class="app-footer">
            <div class="m-shop-footer">
              <a class="m-shop-footer-cart" href="javascript:;" @click="isShowCart = !isShowCart">
                <span class="ydb-icon ydb-icon-cart"></span>
                <span v-show="totalNumber > 0" class="u-badge">{{totalNumber}}</span>
              </a>
              <div class="m-shop-footer-info">
                <p class="m-shop-footer-price">¥ 251.8</p>
                <p class="m-shop-footer-delivery ydb-text-muted">另需配送费5元</p>
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
import cateGoods from '../data/cateGoods.json'

export default {
  name: 'shop',
  data () {
    return {
      appHeight: 0,
      shopNavHeight: 0,
      shopNavTop: 0,
      shopMainTop: 0,
      totalNumber: 0,
      goodItemTop: [],
      curCate: 1,
      isShowCart: false,
      type: 'good',
      shop: {
        logo: logo,
        name: '把愚便当(西溪店)',
        notice: '亲们觉得米饭不够使可以单点的以单点...',
        deliveryType: '蜂鸟专送',
        deliveryTime: 45,
        volume: 999
      },
      cates: []
    }
  },
  watch: {
    cates: {
      handler (val, oldval) {
        const _this = this
        let totalNumber = 0

        val.length > 0 && val.forEach(function (cate, i) {
          var cateTotalNumber = 0
          cate.goods.forEach(function (good, j) {
            totalNumber += parseInt(good.number)
            cateTotalNumber += parseInt(good.number)
          })

          _this.cates[i].total = cateTotalNumber
        })

        _this.totalNumber = totalNumber
      },
      deep: true
    }
  },
  mounted () {
    this.getCate()
    this.$nextTick(function () {
      this.getHeight()
    })

    window.onresize = this.getHeight
  },
  methods: {
    getCate () {
      this.cates = cateGoods
    },
    getHeight () {
      const _this = this

      _this.appHeight = document.body.offsetHeight
      _this.shopNavHeight = _this.$refs.shopNav.offsetHeight

      _this.shopNavTop = _this.$refs.shopNav.offsetTop
      _this.shopMainTop = _this.$refs.shopMain.offsetTop
      _this.$refs.goodItem.forEach(function (ele, index) {
        _this.goodItemTop.push(ele.offsetTop)
      })

      _this.$refs.shopMain.style.minHeight = _this.appHeight - _this.shopNavHeight + 'px'
      _this.$refs.appBody.style.height = _this.appHeight + 'px'
    },
    scrollGood () {
      const scrollTop = this.$refs.appBody.scrollTop

      if (scrollTop >= this.shopNavTop && this.type === 'good') {
        this.$refs.shopNav.classList.add('fixed')
      } else {
        this.$refs.shopNav.classList.remove('fixed')
      }

      if (scrollTop >= this.shopMainTop - this.shopNavHeight && this.type === 'good') {
        this.$refs.shopMain.classList.add('fixed')
      } else {
        this.$refs.shopMain.classList.remove('fixed')
      }

      for (let i = 0, l = this.goodItemTop.length; i < l; i++) {
        if (this.goodItemTop[i] - this.shopNavHeight >= scrollTop) {
          i = i === 0 ? 1 : i
          this.curCate = i
          break
        } else {
          this.curCate = i + 1
        }
      }

      this.$refs.goodCate.scrollTop = this.$refs.cateItem[this.curCate - 1].offsetTop
    },
    selectedCate (cateId) {
      this.curCate = cateId
      let scrollTop = this.$refs.goodItem[cateId - 1].offsetTop - this.shopNavHeight + 2
      scrollTop = scrollTop <= this.shopNavTop ? this.shopNavTop : scrollTop
      this.$refs.appBody.scrollTop = scrollTop
    },
    minusGood (cateId, goodId) {
      this.cates[cateId - 1].goods[goodId - 1].number--
    },
    plusGood (cateId, goodId) {
      this.cates[cateId - 1].goods[goodId - 1].number++
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
}

.m-shop-mask {
  position: relative;
  height: pxTorem(200px);
  overflow: hidden;
}

.m-shop-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%;
  height: auto;
  filter: blur(30px);
  transform: translate(-50%, -50%);
}

.m-shop-box {
  position: relative;
  padding: 0 pxTorem(80px);
  margin-top: pxTorem(-120px);
  text-align: center;
}

.m-shop-name {
  font-size: pxTorem(38px);
  color: $black-color;
}

.m-shop-logo {
  width: pxTorem(160px);
  height: pxTorem(160px);
  background-color: $bright-color;
  border-radius: pxTorem(6px);
}

.m-shop-activity {
  position: relative;
  height: pxTorem(50px);
  margin-top: 0;
  padding: pxTorem(10px) 0;
  text-align: left;
  background-color: $bright-color;
  overflow: hidden;
}

.m-shop-activity p {
  margin-bottom: pxTorem(10px);
}

.m-shop-activity-more {
  position: absolute;
  right: 0;
  color: $secondary-text-color;
}

.m-shop-notice {
  font-size: $extra-small-font-size;
  color: $secondary-text-color;
}

.m-shop-nav-box,
.m-shop-nav {
  height: pxTorem(80px);
}

.m-shop-nav {
  position: relative;
  display: flex;
  background-color: $bright-color;
}

.m-shop-nav:after {
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  content: "";
  transform: scale(.5);
  transform-origin: 0 0;
  pointer-events: none;
  box-sizing: border-box;
  border-bottom: 1px solid $border-color;
}

.m-shop-nav.fixed {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9;
}

.m-shop-nav-item {
  position: relative;
  flex: 1 1 auto;
  height: pxTorem(80px);
  line-height: pxTorem(80px);
  text-align: center;
}

.m-shop-nav-item.active {
  color: $primary-color;
}

.m-shop-nav-item:after {
  position: absolute;
  left: 50%;
  bottom: 0;
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

.m-shop-main {
  background-color: $bright-color;
}

.m-shop-main.fixed .m-shop-good-category {
  position: fixed;
  top: pxTorem(80px);
  left: 0;
  bottom: pxTorem(100px);
  z-index: 9;
}

.m-shop-main.fixed .m-shop-good-container {
  margin-left: pxTorem(160px);
}

.m-shop-good-container {
  padding-bottom: pxTorem(98px);
}

.m-shop-good-category {
  width: pxTorem(160px);
  background-color: $bg-color;
  overflow-x: hidden;
  overflow-y: auto;
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

.m-category-item.active>a {
  color: $primary-text-color;
  background-color: $bright-color;
}

.m-category-item.active>a:after {
  border-color: transparent;
}

.m-category-item .u-badge {
  position: absolute;
  right: pxTorem(15px);
  top: pxTorem(15px);
}

.m-category-title {
  padding: pxTorem(20px) 0 pxTorem(10px);
  font-size: $small-font-size;
  color: $primary-text-color;
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

.m-good-title {
  margin-bottom: pxTorem(8px);
  font-size: $subtitle-font-size;
  font-weight: 500;
  color: $primary-text-color;
}

.m-good-desc {
  font-size: $small-font-size;
  color: $secondary-text-color;
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

.m-shop-footer-cart .ydb-icon {
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
.popup-mask,
.popup-cart {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
}
.popup-mask {
  top: 0;
  background-color: rgba(0, 0, 0, .5);
}
.popup-cart {
  bottom: $footer-height;
  height: pxTorem(300px);
  background-color: $bright-color;
}

.slide-enter-active {
  transition: all .3s;
}
.slide-enter-active.popup-mask {
  transition: opacity .1s;
}

.slide-enter {
  transform: translateY(100%);
}
.slide-enter.popup-mask {
  opacity: 0;
}
</style>
