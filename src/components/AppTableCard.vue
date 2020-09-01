<template>
  <div style="padding: 0 15px">
    <div class="jss108">
      <div class="jss112 jss117" :style="{ background: getColor }">
        <span class="jss175">{{ headerTitle }}</span>
        <div class="header-action">
          <q-btn @click="headerActionClick" v-bind="headerAction"/>
        </div>
      </div>
      <div class="jss135">
        <slot name="container"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { colors } from 'quasar'

const { lighten } = colors
export default {
  name: 'AppTableCard',
  props: {
    headerBackColor: {
      type: String,
      default: ''
    },
    headerTitle: {
      type: String,
      default: ''
    },
    headerActionLabel: {
      type: String,
      default: 'Adicionar'
    },
    headerAction: {
      type: Object,
      default: () => ({
        label: 'Adicionar',
        icon: 'add',
        color: 'blue'
      })
    }
  },
  methods: {
    headerActionClick () {
      this.$emit('headerActionClick')
    }
  },
  computed: {
    getColor () {
      return `linear-gradient(60deg, ${lighten(this.headerBackColor, 10)}, ${this.headerBackColor})`
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  scoped
>
@media  (min-width: 550px) and (max-width: 620px)
  .q-btn
    >>>.q-btn__content
      .q-icon
        font-size calc(var(--font-size) + 8px);
      block
        font-size var(--font-size) !important
@media (max-width: 550px)
  .q-btn
    width: 50px;
    >>>.q-btn__content
      .q-icon
        margin-right: 0;
        font-size: calc(var(--font-size) + 13px);
      .block
        display none !important
.header-action
  float right
.jss175 {
  color: #FFFFFF;
  margin-top: 0px;
  min-height: auto;
  font-weight: bold;
  margin-bottom: 3px;
  text-decoration: none;
  font-size: calc(var(--font-size) + 8px);
}
.jss135 {
  flex: 1 1 auto;
  padding: 10px 5px 5px 5px;
  position: relative;
  -webkit-box-flex: 1;
}

.jss108 {
  color: rgba(0, 0, 0, 0.87);
  width: 100%;
  border: 0;
  display: flex;
  position: relative;
  min-width: 0;
  word-wrap: break-word;
  background: #FFF;
  margin-top: 30px;
  border-radius: 6px;
  margin-bottom: 30px;
  flex-direction: column;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
}

.jss112.jss117:not(.jss115) {
  padding: 15px;
  margin-top: -20px;
  border-radius: 3px;
}

.jss112.jss117 {
  color: #FFF;
  margin: 0 15px 0 15px;
  position: relative;
  padding: 0.75rem 1.25rem;
  z-index: 3 !important;
  background: transparent;
  border-bottom: none;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(76, 175, 80, .4);
}
</style>
