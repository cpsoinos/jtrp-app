<template lang="pug">
  v-layout(row, justify-center)
    v-dialog(v-model='dialog', persistent, width='50%')
      v-btn(primary, dark, slot='activator') Open Dialog
      v-card
        v-card-title
          span.headline User Profile
        v-card-text
          v-container(grid-list-md)
            v-layout(wrap)
              v-flex(xs12)
                v-text-field(label='Email', required, v-model="email")
              v-flex(xs12)
                v-text-field.input-group--focused(
                  v-model="password"
                  label='Password'
                  :append-icon="visible ? 'visibility' : 'visibility_off'"
                  :append-icon-cb='() => (visible = !visible)'
                  type='password'
                )
        v-card-actions
          v-spacer
          v-btn.blue--text.darken-1(flat, @click.native='dialog = false') Close
          v-btn.blue--text.darken-1(flat, @click.native='signIn') Submit
</template>

<script>
  import { HTTP } from '../../http-common'

  export default {
    data() {
      return {
        dialog: false,
        visible: false,
        email: '',
        password: ''
      }
    },

    methods: {
      signIn() {
        HTTP.post('/users/sign_in', {
          user: {
            email: this.email,
            password: this.password
          }
        }).then((response) => {
          debugger
        })
      }
    }
  }
</script>

<style lang="css">
</style>
