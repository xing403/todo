import VueMacros from 'unplugin-vue-macros/vite'
import Vue from '@vitejs/plugin-vue'

export default function createVueMacros() {
  return VueMacros({
    defineOptions: false,
    defineModels: false,
    plugins: {
      vue: Vue({
        script: {
          propsDestructure: true,
          defineModel: true,
        },
      }),
    },
  })
}
