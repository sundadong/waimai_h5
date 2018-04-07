<template>
  <div class="app" style="background-color: #fff;">
    <section class="app-body" ref="appBody" @scroll.passive="scrollGood">
      <div class="ydb-shop-item" ref="shopHeader">
        <div class="ydb-shop-mask">
          <img class="ydb-shop-bg" :src="shop.logo">
        </div>
        <div class="ydb-shop-box" @click="showToast">
          <img class="ydb-shop-logo" :src="shop.logo">
          <div class="ydb-shop-info">
            <h2 class="ydb-shop-name">{{shop.name}}</h2>
            <p>月销{{shop.volume}}  {{shop.deliveryType}}.约{{shop.deliveryTime}}分钟</p>
            <p class="ydb-shop-notice ydb-text-ellipsis" style="margin-bottom: 0;">公告：{{shop.notice}}</p>
            <div class="ydb-shop-activity">
              <span class="ydb-shop-activity-more">3个活动 <span class="ydb-icon ydb-icon-more"></span></span>
              <p><span class="ydb-tag ydb-tag-danger">减</span>满31减30，满93减59，满140减88</p>
              <p><span class="ydb-tag ydb-tag-warning">券</span>下单领取随机面额优惠券</p>
              <p><span class="ydb-tag ydb-tag-success">新</span>门店新客立减1元</p>
            </div>
          </div>
        </div>
      </div>
      <div class="ydb-shop-nav-box">
        <div class="ydb-shop-nav" ref="shopNav">
          <a class="ydb-shop-nav-item" :class="{active: type === 'good'}" href="javascript:;" @click="type = 'good'">商品</a>
          <a class="ydb-shop-nav-item" :class="{active: type === 'evaluation'}" href="javascript:;" @click="type = 'evaluation'">评价</a>
          <a class="ydb-shop-nav-item" :class="{active: type === 'info'}" href="javascript:;" @click="type = 'info'">商家</a>
        </div>
      </div>
      <div class="ydb-shop-main" ref="shopMain">
        <div class="ydb-shop-good" v-show="type === 'good'">
          <ul class="ydb-category-list ydb-shop-good-category" ref="goodCate">
            <li v-for="cate in cates" :key="cate.id" :data-id="cate.id" class="ydb-category-item" :class="{active: curCate === cate.id}" ref="cateItem" @click="selectedCate(cate.id)">
              <a href="javascript:;">{{cate.name}}
                <span v-show="cate.total > 0" class="ydb-badge">{{cate.total}}</span>
              </a>
            </li>
          </ul>
          <div class="ydb-shop-good-container" ref="goodContainer">
            <div v-for="cate in cates" :key="cate.id" ref="goodItem">
              <h2 class="ydb-category-title" :data-id="cate.id">{{cate.name}}</h2>
              <ul class="ydb-good-list">
                <li class="ydb-good-item" v-for="good in cate.goods" :key="good.id">
                  <a href="javascript:;">
                    <img class="ydb-good-pic" :src="good.pic" :alt="good.title">
                    <div class="ydb-good-info">
                      <h3 class="ydb-good-title">{{good.title}}</h3>
                      <p class="ydb-good-desc">{{good.desc}}</p>
                      <p>月销{{good.volume}}  好评率{{good.praiseRate}}</p>
                      <p class="ydb-clearfix">
                        <span class="ydb-fl ydb-text-danger">
                          <span class="ydb-good-price-symbol">¥</span>
                          <span class="ydb-good-price">{{good.price}}</span>
                        </span>
                        <span class="ydb-stepper ydb-fr">
                          <button v-if="good.number > 0" class="ydb-stepper-minus" @click="minusGood(cate.id, good.id)"><span>-</span></button>
                          <input v-if="good.number > 0" class="ydb-stepper-input" type="number" v-model="good.number" readonly>
                          <button class="ydb-stepper-plus" @click="plusGood(cate.id, good.id)"><span>+</span></button>
                        </span>
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <transition-group name="slide" tag="div">
            <div v-show="isShowCart" class="ydb-popup-mask" key="mask" @click="isShowCart = !isShowCart"></div>
            <div v-show="isShowCart" class="ydb-popup-cart" key="cart"></div>
          </transition-group>
          <footer class="app-footer">
            <div class="ydb-shop-footer">
              <a class="ydb-shop-footer-cart" href="javascript:;" @click="isShowCart = !isShowCart">
                <span class="ydb-icon ydb-icon-cart"></span>
                <span v-show="totalNumber > 0" class="ydb-badge">{{totalNumber}}</span>
              </a>
              <div class="ydb-shop-footer-info">
                <p class="ydb-shop-footer-price">¥ 251.8</p>
                <p class="ydb-shop-footer-delivery ydb-text-muted">另需配送费5元</p>
              </div>
              <button class="ydb-btn ydb-btn-primary ydb-btn-lg ydb-btn-pay" href="javascript:;">立即结算</button>
            </div>
          </footer>
        </div>
        <div class="ydb-shop-evaluation" v-show="type === 'evaluation'">
          评价
        </div>
        <div class="ydb-shop-info" v-show="type === 'info'">
          商家信息
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import logo from '../assets/images/logo.png'
import cateGoods from '../data/cateGoods.json'
import Toast from '@/components/Toast'

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
      Toast({
        message: '操作成功',
        iconClass: 'ydb-icon ydb-icon-success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable';

.ydb-shop-item {
  position: relative;
  margin-bottom: 0;
}

.ydb-shop-mask {
  position: relative;
  height: pxTorem(200px);
  overflow: hidden;
}

.ydb-shop-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%;
  height: auto;
  filter: blur(30px);
  transform: translate(-50%, -50%);
}

.ydb-shop-box {
  position: relative;
  padding: 0 pxTorem(80px);
  margin-top: pxTorem(-120px);
  text-align: center;
}

.ydb-shop-name {
  font-size: pxTorem(38px);
  color: $black-color;
}

.ydb-shop-logo {
  width: pxTorem(160px);
  height: pxTorem(160px);
  background-color: $bright-color;
  border-radius: pxTorem(6px);
}

.ydb-shop-activity {
  position: relative;
  height: pxTorem(50px);
  margin-top: 0;
  padding: pxTorem(10px) 0;
  text-align: left;
  background-color: $bright-color;
  overflow: hidden;
}

.ydb-shop-activity p {
  margin-bottom: pxTorem(10px);
}

.ydb-shop-activity-more {
  position: absolute;
  right: 0;
  color: $secondary-text-color;
}

.ydb-shop-notice {
  font-size: $extra-small-font-size;
  color: $secondary-text-color;
}

.ydb-shop-nav-box,
.ydb-shop-nav {
  height: pxTorem(80px);
}

.ydb-shop-nav {
  position: relative;
  display: flex;
  background-color: $bright-color;
}

.ydb-shop-nav:after {
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

.ydb-shop-nav.fixed {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9;
}

.ydb-shop-nav-item {
  position: relative;
  flex: 1 1 auto;
  height: pxTorem(80px);
  line-height: pxTorem(80px);
  text-align: center;
}

.ydb-shop-nav-item.active {
  color: $primary-color;
}

.ydb-shop-nav-item:after {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: pxTorem(80px);
  content: "";
  border-top: pxTorem(4px) solid transparent;
  transform: translateX(-50%);
}

.ydb-shop-nav-item.active:after {
  border-color: $primary-color;
}

.ydb-shop-good {
  display: flex;
  height: 100%;
}

.ydb-shop-main {
  background-color: $bright-color;
}

.ydb-shop-main.fixed .ydb-shop-good-category {
  position: fixed;
  top: pxTorem(80px);
  left: 0;
  bottom: pxTorem(100px);
  z-index: 9;
}

.ydb-shop-main.fixed .ydb-shop-good-container {
  margin-left: pxTorem(160px);
}

.ydb-shop-good-container {
  padding-bottom: pxTorem(98px);
}

.ydb-shop-good-category {
  width: pxTorem(160px);
  background-color: $bg-color;
  overflow-x: hidden;
  overflow-y: auto;
}

.ydb-shop-good-container {
  flex: 1 1 auto;
  padding-left: pxTorem(20px);
  padding-right: pxTorem(20px);
}

.ydb-category-item>a {
  position: relative;
  display: block;
  padding: pxTorem(30px) pxTorem(20px);
  font-size: $small-font-size;
}

.ydb-category-item.active>a {
  color: $primary-text-color;
  background-color: $bright-color;
}

.ydb-category-item.active>a:after {
  border-color: transparent;
}

.ydb-category-item .ydb-badge {
  position: absolute;
  right: pxTorem(15px);
  top: pxTorem(15px);
}

.ydb-category-title {
  padding: pxTorem(20px) 0 pxTorem(10px);
  font-size: $small-font-size;
  color: $primary-text-color;
}

.ydb-shop-footer {
  display: flex;
  height: 100%;
  align-items: center;
  color: $bright-color;
  background-color: #00040A;
}

.ydb-shop-footer-cart {
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

.ydb-shop-footer-cart .ydb-icon {
  font-size: pxTorem(50px);
  margin-right: 0;
}

.ydb-shop-footer-cart .ydb-badge {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(35%, -40%);
}

.ydb-shop-footer-info {
  flex: 1 1 auto;
  padding-left: pxTorem(150px);
}

.ydb-shop-footer-price {
  font-size: $subtitle-font-size;
}

.ydb-shop-footer-delivery {
  font-size: $extra-small-font-size;
}

.ydb-popup-mask,
.ydb-popup-cart {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
}
.ydb-popup-mask {
  top: 0;
  background-color: rgba(0, 0, 0, .5);
}
.ydb-popup-cart {
  bottom: $footer-height;
  height: pxTorem(300px);
  background-color: $bright-color;
}

.slide-enter-active {
  transition: all .3s;
}
.slide-enter-active.ydb-popup-mask {
  transition: opacity .1s;
}

.slide-enter {
  transform: translateY(100%);
}
.slide-enter.ydb-popup-mask {
  opacity: 0;
}
</style>
