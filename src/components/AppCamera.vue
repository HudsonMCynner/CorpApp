<template>
  <div class="app-camera-container row">
    <div class="profile-card">
      <div
        id="loading-content"
        v-if="loadingImage"
      />
      <div
        class="profile-avatar"
        :class="{'rounded' : roudend}"
      >
        <div class="btns-container">
          <div
            class="profile-links"
            v-if="!disable"
          >
            <q-icon
              class="btn-camera"
              :class="{'q-icon-full-height' : file === null & image === null}"
              name="camera"
              @click="getStream"
              v-if="takeFoto && !disableUseCam"
            >
              <q-tooltip
                :disable="disableUseCam"
              >
                {{ $t('domains.dashboard.components.appCamera.action.usarCamera') }}
              </q-tooltip>
            </q-icon>
            <q-icon
              class="btn-camera"
              name="far fa-camera"
              @click="capture"
              v-if="!takeFoto"
              :class="{'q-icon-full-height' : file === null & image === null}"
            >
              <q-tooltip>{{ $t('domains.dashboard.components.appCamera.action.tirarFoto') }}</q-tooltip>
            </q-icon>
            <q-icon
              name="far fa-window-close"
              @click="stop"
              class="btn-add-image"
              v-if="!takeFoto"
              :class="{'q-icon-full-height' : file === null & image === null}"
            >
              <q-tooltip>{{ $t('domains.dashboard.components.appCamera.action.fecharCamera') }}</q-tooltip>
            </q-icon>
            <q-icon
              class="btn-add-image"
              name="wallpaper"
              @change="carregarImagem"
              :disable="disable"
              @click="carregarFoto"
              v-if="takeFoto"
              :class="{'q-icon-full-height' : file === null & image === null, 'disable-use-cam': disableUseCam}"
            >
              <q-tooltip>{{ $t('domains.dashboard.components.appCamera.action.carregarFoto') }}</q-tooltip>
            </q-icon>
            <q-icon
              @click="removeImage"
              :disable="disable"
              class="wallpaper"
              name="far fa-times"
              v-if="file !== null || image !== null"
            >
              <q-tooltip>{{ $t('domains.dashboard.components.appCamera.action.excluirFoto') }}</q-tooltip>
            </q-icon>
          </div>
        </div>
        <a href="#">
          <video
            ref="videoCam"
            :src="source"
            autoplay
            class="video-stream"
            height="126"
            v-if="!takeFoto"
            width="175"
          />
          <img
            id="imgPhoto"
            class="photo"
            :src="src"
            v-if="takeFoto"
          ></a>
        <input
          id="inputFile"
          @change="carregarImagem"
          class="file-input"
          type="file"
        >
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import imageCompression from 'browser-image-compression'

/**
 */
export default {
  /**
   */
  name: 'AppCamera',
  /**
   */
  components: {
  },
  /**
   */
  props: {
    /**
     * Define se o componente sera exibido de forma redoda ou retangular
     */
    roudend: {
      type: Boolean,
      default: true
    },
    /**
     */
    value: {
      type: [String, File, Object],
      default: null
    },
    /**
     */
    disable: {
      type: Boolean,
      default: false
    },
    /**
     */
    disableUseCam: {
      type: Boolean,
      default: false
    }
  },
  /**
   */
  data () {
    // noinspection SpellCheckingInspection
    return {
      loadingImage: false,
      fileInputLoaded: undefined,
      takeFoto: true,
      source: null,
      canvas: null,
      image: null,
      file: null,
      noImage: 'data:image/jpeg;base64,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'
    }
  },
  /**
   */
  computed: {
    /**
     * @returns {string}
     */
    src () {
      return this.image !== null ? this.image : this.noImage
    }
  },
  /**
   */
  methods: {
    /**
     *Obtém o stream do video da camera
     *
     */
    getStream () {
      if (navigator.mediaDevices) {
        this.takeFoto = false
        return navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            this.loadSrcStream(stream)
          })
          .catch((err) => {
            this.takeFoto = true
            return this.$emit('error', err)
          })
      }
      return this.$emit('error', { code: 8 })
    },
    /**
     * Função para remover a imagem
     *
     */
    removeImage () {
      this.file = null
      const preview = document.querySelector('#inputPhoto')
      document.querySelector('#inputFile').value = ''
      if (this.image !== null) {
        this.image = null
      }
      if (preview && preview.src !== '') {
        preview.src = this.noImage
      }
      this.$emit('removeImage')
    },
    /**
     */
    carregarFoto () {
      document.querySelector('#inputFile').click()
    },
    /**
     * Fazer o processamento da imagem e carregar na elemento img
     *
     */
    carregarImagem () {
      this.loadingImage = true
      const preview = document.querySelector('#inputPhoto')
      const fileInput = document.querySelector('#inputFile')
      const file = fileInput.files[0]
      if (this.verifyValidTypeFile(file) && this.verifyValidSizeFile(file)) {
        const options = {
          maxSizeMB: 1024, // (default: Number.POSITIVE_INFINITY)
          maxWidthOrHeight: 600, // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
          useWebWorker: true, // optional, use multi-thread web worker, fallback to run in main-thread (default: true)
          maxIteration: 20 // optional, max number of iteration to compress the image (default: 10)
        }
        imageCompression(file, options)
          .then((newFile) => {
            this.loadingImage = false
            if (!newFile.name) {
              newFile.name = file.name
            }
            fileInput.value = null
            this.fileInputLoaded = newFile
            if (this.verifyValidSizeFile(newFile)) {
              this.readFile(preview, newFile)
              return
            }
            this.$emit('error', {
              type: 'fileSizeError',
              message: 'domains.dashboard.components.appCamera.messages.arquivoGrande'
            })
          })
          .catch(() => {
            this.loadingImage = false
            return this.$message.toast(this.$t('domains.dashboard.components.appCamera.messages.erroCarregarArquivo'), 'warning')
          })
        return
      }
      this.$emit('error', {
        type: 'fileTypeError',
        message: this.$t('domains.dashboard.components.appCamera.messages.arquivosPermitidos')
      })
    },
    /**
     */
    readFile (preview, file) {
      const reader = new FileReader()
      const $this = this
      reader.onload = function (e) {
        $this.file = $this.processarImagem(e.target.result, 'capture.jpeg')
        $this.image = e.target.result
        $this.sendFile($this.file)
      }
      reader.readAsDataURL(file)
    },
    /**
     * @param file
     * @return {Boolean}
     */
    verifyValidTypeFile (file) {
      return file.type.split('/')[1].match(/jpg|jpeg|png/)
    },
    /**
     * @param file
     * @return {Boolean}
     */
    verifyValidSizeFile (file) {
      return file.size <= 5242880
    },
    /**
     * carregar video
     */
    loadSrcStream (stream) {
      if ('srcObject' in this.$refs.videoCam) {
        this.$refs.videoCam.srcObject = stream
      } else {
        this.source = window.HTMLMediaElement.srcObject(stream)
      }
      this.$refs.videoCam.onloadedmetadata = () => {
      }
    },
    /**
     * Parar video
     */
    pararVideo (videoElem) {
      const stream = videoElem.srcObject
      const tracks = stream.getTracks()
      tracks.forEach((track) => {
        track.stop()
        this.$refs.videoCam.srcObject = null
        this.source = null
      })
    },
    /**
     * Stop Video
     *
     */
    stop () {
      this.takeFoto = true
      if (this.$refs.videoCam !== null && this.$refs.videoCam.srcObject) {
        this.pararVideo(this.$refs.videoCam)
      }
    },
    /**
     * @param file
     */
    sendFile (file) {
      this.$emit('capture', file)
    },
    /**
     * Capturar Imagem
     */
    capture () {
      this.takeFoto = true
      this.image = this.getCanvas().toDataURL('image/jpeg')
      this.stop()
      this.file = this.processarImagem(this.image, 'capture.jpeg')
      this.sendFile(this.file)
    },
    /**
     * Converte imagem da camera para Blob e depois em File
     * @param {string} dataUrl (base64)
     * @param {string} fileName
     * @returns {File}
     *
     */
    processarImagem (dataUrl, fileName) {
      const blobBin = atob(dataUrl.split(',')[1])
      const array = []
      for (let i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i))
      }
      const theBlob = new Blob([new Uint8Array(array)], { type: 'image/jpeg' })

      theBlob.lastModifiedDate = new Date().getTime()
      theBlob.name = fileName
      return new File([theBlob], fileName, { type: theBlob.type })
    },
    /**
     * Função para gerar criar um elemento canvas para ser utilizado na conversão do Stream de video em uma imagem
     * @returns {default.methods.canvas}
     */
    getCanvas () {
      const video = this.$refs.videoCam
      if (!this.ctx) {
        const canvas = document.createElement('canvas')
        canvas.height = video.videoHeight
        canvas.width = video.videoWidth
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
      }
      const { ctx, canvas } = this
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      return canvas
    }
  },
  /**
   */
  watch: {
    /**
     */
    value: {
      handler (value) {
        if (value === null) {
          this.image = value
          return
        }
        if (typeof value === 'object') {
          const reader = new FileReader()
          reader.onload = (e) => {
            this.image = e.target.result
          }
          reader.readAsDataURL(value)
          return
        }
        this.image = value
      }
    }
  },
  /**
   */
  created () {
    if (this.value !== null) {
      if (typeof this.value === 'object') {
        const reader = new FileReader()
        reader.onload = (e) => (this.image = e.target.result)
        reader.readAsDataURL(this.value)
        return
      }
    }
    this.image = this.value
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  scoped
>
#loading-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

#loading-text {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  color: #999;
  width: 100px;
  height: 30px;
  margin: -7px 0 0 -45px;
  text-align: center;
  font-family: 'PT Sans Narrow', sans-serif;
  font-size: 20px;
}

#loading-content {
  display: block;
  position: relative;
  left: 50%;
  top: 50%;
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  border: 3px solid #F00;
  z-index 1
}

#loading-content:after {
  content: "";
  position: absolute;
  border: 3px solid #0F0;
  left: 15px;
  right: 15px;
  top: 15px;
  bottom: 15px;
}

#loading-content:before {
  content: "";
  position: absolute;
  border: 3px solid #00F;
  left: 5px;
  right: 5px;
  top: 5px;
  bottom: 5px;
}

#loading-content {
  border: 3px solid transparent;
  border-top-color: #ab8732;
  border-bottom-color: #ab8732;
  border-radius: 50%;
  -webkit-animation: loader 2s linear infinite;
  -moz-animation: loader 2s linear infinite;
  -o-animation: loader 2s linear infinite;
  animation: loader 2s linear infinite;
}

#loading-content:before {
  border: 3px solid transparent;
  border-top-color: #ab8732;
  border-bottom-color: #ab8732;
  border-radius: 50%;
  -webkit-animation: loader 3s linear infinite;
  -moz-animation: loader 2s linear infinite;
  -o-animation: loader 2s linear infinite;
  animation: loader 3s linear infinite;
}

#loading-content:after {
  border: 3px solid transparent;
  border-top-color: #ab8732;
  border-bottom-color: #ab8732;
  border-radius: 50%;
  -webkit-animation: loader 1.5s linear infinite;
  animation: loader 1.5s linear infinite;
  -moz-animation: loader 2s linear infinite;
  -o-animation: loader 2s linear infinite;
}

@-webkit-keyframes loaders {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loader {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

#content-wrapper {
  color: #FFF;
  position: fixed;
  left: 0;
  top: 20px;
  width: 100%;
  height: 100%;
}

#header {
  width: 800px;
  margin: 0 auto;
  text-align: center;
  height: 100px;
  background-color: #666;
}

#content {
  width: 800px;
  height: 1000px;
  margin: 0 auto;
  text-align: center;
  background-color: #888;
}
</style>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  scoped
>
.image-div {
  width 100%
  height: 134px;
  text-align center
}

.app-camera-container {
  border-radius 3px
  position: relative
  width: 100%;
  height: 80%;
  /*border: 1px solid #b1b1b1b1;*/
  display: flex;
  justify-content: center;
}

.video-stream {
  width: 150px;
  height: 150px;
  display: inline-block;
  border: 1px solid #b1b1b1
}

.remove-image {
  position: absolute;
  top: 1px;
  width: 18px;
  left: 181px;
  cursor: pointer;
  background: white;
  height: 22px;
  border: 1px solid #b1b1b1
}

.remove-image i:hover {
  color: red;
}

:focus {
  outline: none;
}

.file-input {
  visibility: hidden;
  position: absolute;
  left: 0;
  top: 0;
}

.foto {
  border: 1px solid #b1b1b1;
  max-height: 134px;
  display: inline-block;
}

.disable-use-cam {
  width 100% !important
  padding 0 !important
}

.profile-card a .photo {
  width: 150px;
  height: 150px;
}

.rounded {
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
}

.profile-card
  .profile-avatar
    background: #ffffff;
    border: 1px solid #eeeeee;
    position: absolute
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    overflow: hidden;
    transition: all .5s;
    -moz-transition: all .5s; /* Firefox 4 */
    -webkit-transition: all .5s; /* Safari and Chrome */
    -o-transition: all .5s; /* Opera */
    .btns-container
      position: relative;
      .profile-links
        cursor pointer
        position: absolute;
        width: 100%;
        height 100%;
        top: 100px;
        left: 0;
        right: 0;
        /*display: none;*/
        z-index 1
        display flex
        flex-direction row
        .q-icon
          display: inline-block;
          background: #ffffff;
          text-decoration: none;
          padding: 5px;
          width: 50%;
          height: 25px;
          font-size 16px

.profile-card .profile-avatar .btns-container .profile-links .q-icon-full-height {
  height: 50px !important
}

.profile-card .profile-avatar .btns-container .profile-links .btn-camera {
  padding 0 0 5px 25px
  background: rgba(103, 186, 144, 0.7);
}

.profile-card .profile-avatar .btns-container .profile-links .btn-camera:hover {
  background: rgba(103, 186, 144, 1) !important
}

.profile-card .profile-avatar .btns-container .profile-links .btn-remove-image {
  width 100% !important
  background: rgba(231, 76, 60, 0.7);
}

.profile-card .profile-avatar .btns-container .profile-links .btn-remove-image:hover {
  background: rgba(231, 76, 60, 1);
}

.profile-card .profile-avatar .btns-container .profile-links .btn-add-image {
  padding 0 25px 5px 0
  background: rgba(157, 177, 218, 0.7);
}

.profile-card .profile-avatar .btns-container .profile-links .btn-add-image:hover {
  background: rgba(157, 177, 218, 1);
}
</style>
