<template>
  <div style="padding: 0 15px">
    <div class="jss108">
      <div class="jss112 jss114 jss115">
        <div class="jss122 jss126" :style="{ background: getColor }">
          <span class="material-icons MuiIcon-root" aria-hidden="true">{{ icon }}</span>
        </div>
        <p class="jss102">{{ topRightLabel }}</p>
        <h5 class="jss104">{{ middleLabel }}</h5></div>
      <div class="jss130 jss133">
        <div class="jss101"><a @click="$emit('click')">{{ bottomLabel }}</a></div>
      </div>
    </div>
  </div>
</template>

<script>
import { colors } from 'quasar'
const { lighten } = colors
export default {
  name: 'AppQuantCard',
  props: {
    icon: {
      type: String,
      default: ''
    },
    topRightLabel: {
      type: String,
      default: ''
    },
    middleLabel: {
      type: String,
      default: ''
    },
    bottomLabel: {
      type: String,
      default: ''
    },
    cardColor: {
      type: String,
      default: ''
    }
  },
  computed: {
    getColor () {
      return `linear-gradient(60deg, ${lighten(this.cardColor, 10)}, ${this.cardColor})`
    }
  }
}
</script>

<style scoped>
.jss108 {
  color: rgba(0, 0, 0, 0.87);
  width: 100%;
  border: 0;
  display: flex;
  position: relative;
  min-width: 0;
  word-wrap: break-word;
  background: #FFF;
  /*box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);*/
  margin-top: 30px;
  border-radius: 6px;
  margin-bottom: 30px;
  flex-direction: column;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
}
.jss112.jss114 i, .jss112.jss114 .material-icons {
  width: 56px;
  height: 56px;
  overflow: unset;
  font-size: calc(var(--font-size) + 24px);
  text-align: center;
  line-height: 56px;
  margin-bottom: 1px;
}
.jss101 {
  color: #999;
  display: inline-flex;
  font-size: var(--font-size);
  line-height: 22px;
}
a, a:focus, a:hover {
  text-decoration: none;
}
.jss102 {
  color: #999;
  margin: 0;
  font-size: var(--font-size);
  padding-top: 10px;
}
.jss102 {
  color: #999;
  margin: 0;
  font-size: var(--font-size);
  padding-top: 10px;
}
.jss112.jss115, .jss112.jss114 {
  color: #FFF;
  margin: 0 15px;
  padding: 0 0 10px 0;
  position: relative;
}
.jss122.jss126{
  float: left;
  padding: 15px;
  margin-top: -20px;
  margin-right: 15px;
  border-radius: 3px;
  background-color: #999;
}
.jss112.jss114.jss115 {
  text-align: right;
}
.jss104 {
  color: #3C4858;
  margin-top: 0px;
  min-height: auto;
  font-weight: 300;
  margin-bottom: 3px;
  text-decoration: none;
}
.jss126 {
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px #00000073;
}
.jss130 {
 border-width: 1px 0 0 0;
 border-style: solid;
  border-color: #c7c4c4;
 margin: 5px 15px 10px;
 display: flex;
 padding: 10px 0 0 0;
 align-items: center;
 border-radius: 0;
 justify-content: space-between;
 background-color: transparent;
}
</style>
