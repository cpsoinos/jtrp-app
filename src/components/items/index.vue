<template lang="pug">
  v-layout(row, wrap)
    v-flex(xs12)
      v-card
        v-card-title
          | Items
          v-spacer
          v-text-field(append-icon='search', label='Search', single-line, hide-details, v-model='search')
        v-data-table(
          :headers='headers'
          :items='items'
          :pagination.sync="pagination"
          hide-actions
          :total-items="totalItems"
          :loading="loading"
        )

          template(slot='headerCell', scope='props')
            span(v-tooltip:bottom="{ 'html': props.header.text }")
              | {{ props.header.text }}

          template(slot='items', scope='props')
            td.text-xs-center
              v-avatar.grey.lighten-4(:tile="false", style="margin-top: 3px; margin-bottom: 3px;")
                img(:src='props.item.featured_photo.photo.tiny_thumb.url', :alt='props.item.description')
            td.text-xs-center {{ props.item.id }}
            td.text-xs-center {{ props.item.status }}
            td.text-xs-left {{ props.item.description }}
            td.text-xs-left {{ props.item.account.primary_contact ? props.item.account.primary_contact.last_name : '' }}
            td.text-xs-center {{ props.item.account_item_number }}
            td.text-xs-right {{ props.item.purchase_price_cents | currency }}
            td.text-xs-right {{ props.item.listing_price_cents | currency }}
            td.text-xs-right {{ props.item.sale_price_cents | currency }}
            td.text-xs-right {{ props.item.sold_at | timestamp }}

        .text-xs-center
          v-pagination(:length='pages', v-model='pagination.page', :total-visible='7')
</template>

<script>
  import { HTTP } from '../../http-common'
  import moment from 'moment'
  import _ from 'lodash'

  export default {
    data() {
      return {
        search: '',
        totalItems: 0,
        items: [],
        loading: true,
        headers: [
          { value: 'items.featured_photo', sortable: false, align: 'center' },
          { text: 'SKU', value: 'items.id', align: 'center' },
          { text: 'Status', value: 'items.status', align: 'center' },
          { text: 'Description', value: 'items.description', align: 'left' },
          { text: 'Account', value: 'accounts.slug', align: 'left' },
          { text: 'Acct. Item No.', value: 'items.account_item_number', align: 'center' },
          { text: 'Cost', value: 'items.purchase_price_cents', align: 'right' },
          { text: 'Listing Price', value: 'items.listing_price_cents', align: 'right' },
          { text: 'Sale Price', value: 'items.sale_price_cents', align: 'right' },
          { text: 'Sale Date', value: 'items.sold_at', align: 'right' }
        ],
        pagination: {
          rowsPerPage: 25,
          page: 1
        },
        itemParams: {
          // per_page: 25,
          // offset: 0,
          // sort_column: 'id',
          // sort_direction: 'asc',
          include: {
            account: {
              include: {
                primary_contact: {
                  only: 'last_name'
                }
              }
            }
          },
          methods: ['featured_photo']
        }
      }
    },

    watch: {
      pagination: {
        handler() {
          this.fetchItems()
        },
        deep: true
      },
      search: {
        handler() {
          this.fetchItems()
        },
        deep: true
      }
    },

    mounted() {
      this.fetchItems()
    },

    computed: {
      pages() {
        return this.pagination.rowsPerPage ? Math.ceil(this.totalItems / this.pagination.rowsPerPage) : 0
      }
    },

    methods: {
      fetchItems: _.debounce(
        function() {
          this.loading = true
          this.itemParams.per_page = this.pagination.rowsPerPage
          this.itemParams.offset = (this.pagination.page - 1) * this.pagination.rowsPerPage
          this.itemParams.sort_column = this.pagination.sortBy
          if (this.pagination.descending) {
            this.itemParams.sort_direction = this.pagination.descending ? 'desc' : 'asc'
          } else {
            this.itemParams.sort_direction = null
          }
          this.itemParams.search = this.search
          HTTP.get('/items.json', {
            params: this.itemParams
          }).then((items) => {
            this.loading = false
            this.totalItems = parseInt(items.headers['x-total'])
            return this.items = items.data
          })
        }, 500
      ),

      changeSort(column) {
        this.itemParams.sort_column = column
        this.itemParams.sort_direction = this.pagination.sort_direction === 'asc' ? 'desc' : 'asc'
      }
    },

    filters: {
      timestamp(time) {
        return moment(time).format('M/D/YY h:mm a')
      },

      currency(amount) {
        return `$${(amount / 100).toFixed(2)}`
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
