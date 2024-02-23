import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'

import createAutoImport from './auto-import'
import createComponents from './components'
import createUnocss from './unocss'
import createSvgIcon from './svg-icon'
import createPage from './page'

export default function createVitePlugins(isBuild = false) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
  ]
  vitePlugins.push(createPage())
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createComponents())
  vitePlugins.push(createUnocss())
  vitePlugins.push(createSvgIcon(isBuild))
  return vitePlugins
}
