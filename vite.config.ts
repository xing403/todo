/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig } from 'vite'

import createVitePlugins from './plugins'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: createVitePlugins(),

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
})
