<template>
  <div class="q-loading-bar" :class="classes" :style="style">
    <span class="progress">{{ progress }}%</span>
  </div>
</template>

<script>
const isSSR = typeof window === 'undefined'
function between (v, min, max) {
  return max <= min
    ? min
    : Math.min(max, Math.max(min, v))
}
const
  xhr = isSSR ? null : XMLHttpRequest,
  send = isSSR ? null : xhr.prototype.send,
  stack = { start: [], stop: [] }
let highjackCount = 0
function translate ({ p, pos, active, horiz, reverse, dir }) {
  let x = 1, y = 1

  if (horiz) {
    if (reverse) { x = -1 }
    if (pos === 'bottom') { y = -1 }
    return { transform: `translate3d(${x * (p - 100)}%,${active ? 0 : y * -200}%,0)` }
  }

  if (reverse) { y = -1 }
  if (pos === 'right') { x = -1 }
  return { transform: `translate3d(${active ? 0 : dir * x * -200}%,${y * (p - 100)}%,0)` }
}
function inc (p, amount) {
  debugger
  if (typeof amount !== 'number') {
    if (p < 25) {
      amount = Math.random() * 3 + 3
    } else if (p < 65) {
      amount = Math.random() * 3
    } else if (p < 85) {
      amount = Math.random() * 2
    } else if (p < 99) {
      amount = 0.6
    } else {
      amount = 0
    }
  }
  return between(p + amount, 0, 100)
}
function highjackAjax (start, stop) {
  stack.start.push(start)
  stack.stop.push(stop)

  highjackCount++

  if (highjackCount > 1) { return }

  function endHandler () {
    stack.stop.map(fn => { fn() })
  }

  xhr.prototype.send = function (...args) {
    stack.start.map(fn => { fn() })

    this.addEventListener('abort', endHandler, false)
    this.addEventListener('readystatechange', () => {
      if (this.readyState === 4) { endHandler() }
    }, false)

    send.apply(this, args)
  }
}
function restoreAjax (start, stop) {
  stack.start = stack.start.filter(fn => fn !== start)
  stack.stop = stack.stop.filter(fn => fn !== stop)

  highjackCount = Math.max(0, highjackCount - 1)
  if (!highjackCount) {
    xhr.prototype.send = send
  }
}
export default {
  name: 'QAjaxBar',
  props: {
    position: {
      type: String,
      default: 'top',
      validator (val) {
        return ['top', 'right', 'bottom', 'left'].includes(val)
      }
    },
    size: {
      type: String,
      default: '20px'
    },
    dirRtl: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'blue'
    },
    skipHijack: Boolean,
    reverse: Boolean
  },
  data () {
    return {
      calls: 0,
      progress: 0,
      onScreen: false,
      animate: true
    }
  },
  computed: {
    classes () {
      return [
        `q-loading-bar--${this.position}`,
        `bg-${this.color}`,
        this.animate ? '' : 'no-transition'
      ]
    },
    style () {
      const active = this.onScreen

      const o = translate({
        p: this.progress,
        pos: this.position,
        active,
        horiz: this.horizontal,
        reverse: ['top', 'bottom'].includes(this.position)
          ? this.reverse
          : !this.reverse,
        dir: this.dirRtl ? -1 : 1
      })

      o[this.sizeProp] = this.size
      o.opacity = active ? 1 : 0

      return o
    },
    horizontal () {
      return this.position === 'top' || this.position === 'bottom'
    },
    sizeProp () {
      return this.horizontal ? 'height' : 'width'
    }
  },

  methods: {
    start (speed = 300) {
      this.calls++
      if (this.calls > 1) { return }

      clearTimeout(this.timer)
      this.$emit('start')

      if (this.onScreen) { return }

      this.progress = 0
      this.onScreen = true
      this.animate = false
      this.timer = setTimeout(() => {
        this.animate = true
        this.__work(speed)
      }, 100)
    },

    increment (amount) {
      this.calls > 0 && (this.progress = inc(this.progress, amount))
    },

    stop () {
      this.calls = Math.max(0, this.calls - 1)
      if (this.calls > 0) { return }

      clearTimeout(this.timer)
      this.$emit('stop')

      const end = () => {
        this.animate = true
        this.progress = 100
        this.timer = setTimeout(() => {
          this.onScreen = false
        }, 1000)
      }

      if (this.progress === 0) {
        this.timer = setTimeout(end, 1)
      } else {
        end()
      }
    },

    __work (speed) {
      if (this.progress < 100) {
        this.timer = setTimeout(() => {
          this.increment()
          this.__work(speed)
        }, speed)
      }
    }
  },

  mounted () {
    if (!this.skipHijack) {
      this.hijacked = true
      highjackAjax(this.start, this.stop)
    }
  },

  beforeDestroy () {
    clearTimeout(this.timer)
    this.hijacked && restoreAjax(this.start, this.stop)
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  scoped
>
.q-loading-bar
  position fixed
  z-index $z-max
  transition transform .5s cubic-bezier(0, 0, .2, 1), opacity .5s

  &--top
    left 0 /* rtl:ignore */
    right 0 /* rtl:ignore */
    top 0
    width 100%
  &--bottom
    left 0 /* rtl:ignore */
    right 0 /* rtl:ignore */
    bottom 0
    width 100%

  &--right
    top 0
    bottom 0
    right 0
    height 100%
  &--left
    top 0
    bottom 0
    left 0
    height 100%
.progress
  color: #fff;
  margin: 0 5px;
  font-weight: bolder;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;

.os-progress-bar--meter
  -webkit-animation: progress 0.7s linear infinite
  -moz-animation: progress 0.7s linear infinite
  animation: progress 0.7s linear infinite
  -webkit-box-sizing: border-box
  -moz-box-sizing: border-box
  box-sizing: border-box
  background-color: #f58220
  background-image: -webkit-linear-gradient(-45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%)
  background-image: linear-gradient(-45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%)
  background-size: 2.5em 2.5em
  background-repeat: repeat-x
  border: 1px solid #c05d09
  border-radius: 0.2083333333em
  display: block
  height: 100%

@-webkit-keyframes progress {
  0% {
    background-position: 0px 0px;
  }
  100% {
    background-position: 2.5em 0px;
  }
}
@-moz-keyframes progress {
  0% {
    background-position: 0px 0px;
  }
  100% {
    background-position: 2.5em 0px;
  }
}
@keyframes progress {
  0% {
    background-position: 0px 0px;
  }
  100% {
    background-position: 2.5em 0px;
  }
}
</style>
