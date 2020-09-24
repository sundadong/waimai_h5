<template>
  <div class="app">
    <section class="app-body">
      <p>{{origin}}</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'position',
  data () {
    return {
      origin: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      console.log(from)
      vm.setOrigin(from)
    })
  },
  methods: {
    setOrigin (origin) {
      this.origin = {
        name: origin.name,
        title: origin.meta.title,
        path: origin.path,
        fullPath: origin.fullPath
      }
    }
  }
}
</script>
