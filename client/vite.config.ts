import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import stringHash from 'string-hash'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: {
      // https://github.com/tailwindlabs/tailwindcss/discussions/3109#discussioncomment-335950
      generateScopedName: (name, filename, css) => {
        if (name === 'dark') return 'dark'
        const i = css.indexOf(`.${name}`)
        const lineNumber = css.substr(0, i).split(/[\r\n]/).length
        const hash = stringHash(css).toString(36).substr(0, 5)

        return `_${name}_${hash}_${lineNumber}`
      }
    }
  },
  plugins: [react()],
})
