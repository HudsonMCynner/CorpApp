<template>
  <div style="padding: 0 15px">
    <div class="jss108">
      <div class="jss112 jss117" :style="{ background: getColor }">
        <span class="jss175">{{ title }}</span>
        <p class="jss174">{{ subTitle }}</p>
      </div>
      <div class="jss135">
        <slot name="form"></slot>
      </div>
      <div class="actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { colors } from 'quasar'
const { lighten } = colors
export default {
  name: 'AppFormCard',
  props: {
    color: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    }
  },
  computed: {
    getColor () {
      return `linear-gradient(60deg, ${lighten(this.color, 10)}, ${this.color})`
    }
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  scoped
>
>>>.actions
  padding: 0 20px;
  min-height: 45px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap wrap
  margin-bottom 10px
  justify-content: flex-end;
  .q-btn
    margin: 5px;
    padding: 2px;
    height: 40px;
    .q-btn__wrapper
      padding 0
      .q-btn__content
        display flex
        flex-direction: row;
        justify-content: flex-start;
        padding: 0 5px;
        .q-icon
          margin: 0 5px 0 0px;

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
  padding: 10px 0px 5px 12px;
  position: relative;
  -webkit-box-flex: 1;
}
.jss174 {
  color: rgba(255, 255, 255, .62);
  margin: 0 0 0 0;
  font-size: calc(var(--font-size) + 2px);
  font-weight: bold;
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

.jss112.jss117{
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
