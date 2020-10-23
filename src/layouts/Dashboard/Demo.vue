<template>
  <main style="background: white">
    <ajax-bar size="50px" :reverse="true"/>
    <section>
      <figure>
        <chart
          :options="line"
          :init-options="initOptions"
          ref="bar"
          theme="ovilia-green"
          autoresize
        />
      </figure>
    </section>

    <section>
      <figure>
        <chart
          :options="bar"
          :init-options="initOptions"
          ref="bar"
          theme="ovilia-green"
          autoresize
        />
      </figure>
    </section>

    <section>
      <figure>
        <chart
          :options="pie"
          :init-options="initOptions"
          ref="pie"
          autoresize
        />
      </figure>
    </section>

    <aside :class="{ modal: true, open }" @click="open = false">
      <img v-if="img.src" :src="img.src" :width="img.width" />
    </aside>

    <aside class="renderer">
      <button
        :class="{
          active: initOptions.renderer === 'canvas'
        }"
        @click="initOptions.renderer = 'canvas'"
      >
        Canvas
      </button>
      <button
        :class="{
          active: initOptions.renderer === 'svg'
        }"
        @click="initOptions.renderer = 'svg'"
      >
        SVG
      </button>
    </aside>
  </main>
</template>

<script>
/* eslint-disable no-console */
import qs from 'qs'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import getBar from './data/bar'
import getLine from './data/line'
import pie from './data/pie'
// custom theme
import theme from './theme.json'
import PessoaService from 'layouts/Administrador/Pessoa/Service/PessoaService'
ECharts.registerTheme('ovilia-green', theme)
import AjaxBar from 'components/AjaxBar/AjaxBar'

export default {
  components: {
    chart: ECharts,
    AjaxBar
  },
  created () {
    PessoaService.build().get('')
  },
  data () {
    const options = qs.parse(location.search, { ignoreQueryPrefix: true })
    return {
      options,
      bar: getBar(),
      pie,
      line: getLine(),
      expand: {
        bar: true,
        pie: true,
        polar: true,
        scatter: true,
        map: true,
        radar: true,
        connect: true,
        flight: true
      },
      initOptions: {
        renderer: options.renderer || 'canvas'
      },
      polarTheme: 'dark',
      seconds: -1,
      asyncCount: false,
      connected: true,
      metricIndex: 0,
      open: false,
      img: {},
      flightLoaded: false,
      flightOptions: null
    }
  }
}
</script>
