<template lang="pug">
  v-app(light)
    v-navigation-drawer(persistent, :mini-variant='miniVariant', :clipped='clipped', v-model='drawer', enable-resize-watcher)
      v-list
        v-list-tile(value='true', v-for='(item, i) in items', :key='i')
          v-list-tile-action
            v-icon(light, v-html='item.icon')
          v-list-tile-content
            v-list-tile-title(v-text='item.title')
    v-toolbar(fixed)
      v-toolbar-side-icon(@click.stop='drawer = !drawer', light)
      v-btn(icon, light, @click.stop='miniVariant = !miniVariant')
        v-icon(v-html="miniVariant ? 'chevron_right' : 'chevron_left'")
      v-btn(icon, light, @click.stop='clipped = !clipped')
        v-icon web
      v-btn(icon, light, @click.stop='fixed = !fixed')
        v-icon remove
      v-toolbar-title(v-text='title')
      v-spacer
      v-btn(icon, light, @click.stop='rightDrawer = !rightDrawer')
        v-icon menu
    main
      v-container(fluid)
        v-slide-y-transition(mode='out-in')
          router-view
</template>

<script>
  export default {
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'bubble_chart', title: 'Inspire' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
