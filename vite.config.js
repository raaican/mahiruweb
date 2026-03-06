import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about/index.html'),
                project: resolve(__dirname, 'project/index.html'),
                login: resolve(__dirname, 'login/index.html'),
                register: resolve(__dirname, 'register/index.html'),
            }
        }
    }
})
