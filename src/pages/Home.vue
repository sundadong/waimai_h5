<template>
  <div class="app">
    <router-link :to="{ name: 'position'}" tag="div" class="app-action-bar">
      <span class="u-icon icon-map"></span>郡原公元里<span class="u-icon icon-more" style="margin-left: .12rem;"></span>
    </router-link>
    <section class="app-body">
      <div class="m-shop">
        <ul class="m-shop-list">
          <li class="m-shop-item" v-for="shop in shopList" :key="shop.id">
            <router-link :to="{ name: 'shop', params: { id: shop.id }}">
              <img class="m-shop-logo" :src="shop.logo" :alt="shop.name">
              <div class="m-shop-info">
                <h2 class="m-shop-name">{{shop.name}}</h2>
                <p><span class="u-label u-label-primary">{{shop.deliveryType}}.约{{shop.deliveryTime}}分钟</span></p>
                <p class="f-clearfix"><span class="m-shop-address f-fl"><span class="u-icon icon-map"></span>{{shop.address}}</span><span class="f-fr">{{shop.distance}}km</span></p>
                <div class="m-shop-activity">
                  <p><span class="u-label u-label-danger">减</span>满31减30，满93减59，满140减88</p>
                  <p><span class="u-label u-label-warning">券</span>下单领取随机面额优惠券</p>
                  <p><span class="u-label u-label-success">新</span>门店新客立减1元</p>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import logo from '../assets/logo.png'

export default {
  name: 'home',
  data () {
    return {
      shopList: [
        {
          id: 1,
          logo: logo,
          name: '把愚便当(西溪店)',
          deliveryType: '蜂鸟配送',
          deliveryTime: 45,
          distance: 1.2,
          address: '浙江省杭州市西湖区郡原公元里1幢'
        },
        {
          id: 2,
          logo: logo,
          name: '把愚便当(城西店)',
          deliveryType: '商家配送',
          deliveryTime: 40,
          distance: 2.7,
          address: '浙江省杭州市西湖区郡原公元里7幢6楼'
        },
        {
          id: 3,
          logo: logo,
          name: '把愚便当(良渚店)',
          deliveryType: '商家配送',
          deliveryTime: 40,
          distance: 2.7,
          address: '浙江省杭州市西湖区郡原公元里7幢6楼'
        },
        {
          id: 4,
          logo: logo,
          name: '把愚便当(蒋村店)',
          deliveryType: '商家配送',
          deliveryTime: 42,
          distance: 2.8,
          address: '浙江省杭州市西湖区郡原公元里7幢6楼'
        },
        {
          id: 5,
          logo: logo,
          name: '把愚便当(西湖店)',
          deliveryType: '商家配送',
          deliveryTime: 38,
          distance: 2.2,
          address: '浙江省杭州市西湖区郡原公元里7幢6楼'
        },
        {
          id: 6,
          logo: logo,
          name: '把愚便当(下城店)',
          deliveryType: '商家配送',
          deliveryTime: 48,
          distance: 1.7,
          address: '浙江省杭州市西湖区郡原公元里7幢6楼'
        },
        {
          id: 7,
          logo: logo,
          name: '把愚便当(黄龙店)',
          deliveryType: '商家配送',
          deliveryTime: 40,
          distance: 3.7,
          address: '浙江省杭州市西湖区郡原公元里7幢6楼'
        },
        {
          id: 8,
          logo: logo,
          name: '把愚便当(淘宝城店)',
          deliveryType: '商家配送',
          deliveryTime: 40,
          distance: 2.1,
          address: '浙江省杭州市西湖区郡原公元里7幢6楼'
        },
        {
          id: 9,
          logo: logo,
          name: '把愚便当(留下店)',
          deliveryType: '商家配送',
          deliveryTime: 36,
          distance: 2.7,
          address: '浙江省杭州市西湖区郡原公元里7幢6楼'
        },
        {
          id: 10,
          logo: logo,
          name: '把愚便当(下沙店)',
          deliveryType: '商家配送',
          deliveryTime: 40,
          distance: 2.7,
          address: '浙江省杭州市西湖区郡原公元里7幢6楼'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.m-shop-activity {
  padding: 0;
}
</style>
