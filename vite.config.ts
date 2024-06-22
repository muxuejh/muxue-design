import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  return {
    plugins: [
      vue(),
      // svg 图标配置
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]'
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src') // 相对路径别名配置，使用 @ 代替 src
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";'
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 5000,
      open: true
      /* proxy: {
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_APP_BASE_API,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      } */
    }
  }
})
