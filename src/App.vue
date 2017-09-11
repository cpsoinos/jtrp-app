<template lang="pug">
  v-app(light)
    v-navigation-drawer(persistent, :mini-variant='miniVariant', v-model='drawer', enable-resize-watcher)
      v-list
        v-list-tile(v-for="(route, i) in routes", :key="i", :to="route.path")
          v-list-tile-action
            v-icon(light v-html="route.icon")
          v-list-tile-content
            v-list-tile-title(v-text="route.name")
    v-toolbar(fixed)
      v-toolbar-side-icon(@click.stop='drawer = !drawer', light)
      v-btn(icon, light, @click.stop='miniVariant = !miniVariant')
        v-icon(v-html="miniVariant ? 'chevron_right' : 'chevron_left'")
      v-toolbar-title(v-text='title')
      v-spacer
      v-btn.white--text(icon v-if="!authenticated", @click="login")
        v-icon account_circle
      v-btn.white--text(icon v-if="authenticated", @click="logout")
        v-icon exit_to_app

    main
      v-container(fluid)
        v-slide-y-transition(mode="out-in")
          router-view(
            :auth="auth"
            :authenticated="authenticated"
            :admin="admin"
          )
</template>

<script>
  import AuthService from './services/AuthService'
  const auth = new AuthService()
  const { login, logout, authenticated, admin, authNotifier } = auth

  export default {
    data() {
      authNotifier.on('authChange', authState => {
        this.authenticated = authState.authenticated
        this.admin = authState.admin
      })

      return {
        auth,
        authenticated,
        admin,
        drawer: true,
        routes: [
          { icon: 'person', name: 'Login', path: '/auth' },
          { icon: 'weekend', name: 'Items', path: '/items' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false
      }
    },

    computed: {
      title() {
        return this.$route.name
      }
    },

    events: {
      logout() {
        this.logout()
      }
    },

    methods: {
      login,
      logout
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
