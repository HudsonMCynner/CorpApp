<template>
  <div>
    <q-list >
      <q-item-label
        header
        class="text-grey-8"
      >
        <div class="menu-header" />
      </q-item-label>
    </q-list>
    <q-list class="menu-list">
      <q-item
        v-for="link in menus"
        :key="link.to"
        clickable
        @click.native="open(link.to)"
        :class="{'selected': getSelected(link.to)}"
      >
        <q-item-section
          v-if="link.icon"
          avatar
        >
          <q-icon :name="link.icon" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ link.title }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>

</template>

<script>
export default {
  name: 'EssentialLink',
  created () {
    this.opened = this.$route.path
  },
  props: {
    menus: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    opened: undefined
  }),
  methods: {
    open (path) {
      if (this.opened === path) {
        return
      }
      this.opened = path
      this.$router.push(path)
    },
    getSelected (path) {
      return this.opened === path
    }
  },
  computed: {
  }
}
</script>
<style
  lang="stylus"
  rel="stylesheet/stylus"
  scoped
>
.q-item__label--header
  padding 3px
  display flex
  justify-content center
  box-shadow 0 12px 20px -10px rgba(0, 0, 0,.28), 0 4px 20px 0 rgba(0, 0, 0,.12), 0 7px 8px -5px rgba(0, 0, 0,.2)
.menu-header
  height 44px
  width 150px
  /*background-image url("~assets/login/logo_sistema.png")*/
  background-repeat no-repeat
  background-size: contain

.menu-list
  /*padding 10px*/
  .q-item
    font-weight 700
    font-size 14px
    color rgba(0, 0, 0, 0.5)
  .q-router-link--active
    color white
    border-radius 7px
    background #AB8732
.selected
  color white !important
  /*border-radius 7px*/
  background #AB8732
  box-shadow: 0 12px 20px -10px rgba(171, 135, 50,.28), 0 4px 20px 0 rgba(0, 0, 0,.12), 0 7px 8px -5px rgba(171, 135, 50,.2);

.menu-bottom
  width: auto;
  margin: 10px 15px 0;
  display: block;
  padding: 10px 15px;
  position: relative;
  transition: all 300ms linear;
  font-weight: 300;
  line-height: 1.5em;
  border-radius: 3px;
  background-color: transparent;

.label-one-icon
  color: rgba(0, 0, 0, 0.5);
  float: left;
  width: 24px;
  height: 30px;
  font-size: 24px;
  text-align: center;
  line-height: 30px;
  margin-right: 15px;
  vertical-align: middle;

.label-one
  color: rgba(0, 0, 0, 0.5);
  margin: 0;
  font-size: 14px;
  font-weight: bold;
  line-height: 30px;
.digital
  width: auto;
  margin: 10px 15px 0;
  display: block;
  padding: 10px 15px;
  position: relative;
  transition: all 300ms linear;
  font-weight: 300;
  line-height: 1.5em;
  border-radius: 3px;
  background-color: transparent;

.estude-em-casa
  width: auto;
  margin: 10px 15px 0;
  display: block;
  padding: 10px 15px;
  position: relative;
  transition: all 300ms linear;
  font-weight: 300;
  line-height: 1.5em;
  border-radius: 3px;
  background-color: transparent;
</style>
