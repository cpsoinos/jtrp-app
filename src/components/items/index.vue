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
          :search='search'
          :pagination.sync="pagination"
          :total-items="totalItems"
          :loading="loading"
        )
          template(slot='headerCell', scope='props')
            span(v-tooltip:bottom="{ 'html': props.header.text }")
              | {{ props.header.text }}

          template(slot='items', scope='props')
            //- td(v-html="props.item.featured_photo_url")
            td.text-xs-center {{ props.item.id }}
            td.text-xs-center {{ props.item.status }}
            td.text-xs-left {{ props.item.description }}
            td.text-xs-left {{ props.item.account.primary_contact.last_name }}
            td.text-xs-right {{ props.item.account_item_number }}
            td.text-xs-right {{ props.item.purchase_price_cents | currency }}
            td.text-xs-right {{ props.item.listing_price_cents | currency }}
            td.text-xs-right {{ props.item.sale_price_cents | currency }}
            td.text-xs-right {{ props.item.sold_at | timestamp }}
          template(slot='pageText', scope='{ pageStart, pageStop }')
            | From {{ pageStart }} to {{ pageStop }}
</template>

<script>
  import { HTTP } from '../../http-common'
  import moment from 'moment'

  export default {
    data() {
      return {
        search: '',
        totalItems: 0,
        items: [],
        loading: true,
        pagination: {
          // sortBy: 'column',
          // page: 1,
          // rowsPerPage: 25,
          // descending: false,
          // totalItems: 0
        },
        paginationParams: {
          limit: 25,
          offset: 0
        },
        headers: [
          // {
          //   text: '',
          //   align: 'left',
          //   sortable: false,
          //   value: 'featured_photo_url'
          // },
          { text: 'SKU', value: 'id' },
          { text: 'Status', value: 'status' },
          { text: 'Description', value: 'description' },
          { text: 'Account', value: 'users.last_name' },
          { text: 'Acct. Item No.', value: 'account_item_number' },
          { text: 'Cost', value: 'purchase_price_cents' },
          { text: 'Listing Price', value: 'listing_price_cents' },
          { text: 'Sale Price', value: 'sale_price_cents' },
          { text: 'Sale Date', value: 'sold_at' }
        ]
      }
    },

    watch: {
      pagination: {
        handler() {
          this.fetchItems()
        },
        deep: true
      }
    },

    mounted() {
      this.fetchItems()
    },

    methods: {
      fetchItems() {
        this.loading = true
        HTTP.get('/items.json', {
          params: {
            limit: this.paginationParams.limit,
            offset: this.paginationParams.offset,
            include: {
              account: {
                include: {
                  primary_contact: {
                    only: 'last_name'
                  }
                }
              }
            },
            methods: ['featured_photo_url']
          }
        }).then((items) => {
          this.loading = false
          this.totalItems = parseInt(items.headers['x-total'])
          this.paginationParams.offset = this.paginationParams.limit + this.paginationParams.limit
          return this.items = items.data
        })
      },

      imageTag(item) {
        return item.feature.toHtml()
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

<style lang="css">
</style>
