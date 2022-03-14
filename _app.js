import '../styles/globals.css'
// import '../src/input.css'
// import '../styles/Home.module.css'
import '../dist/output.css'

// 1 例子: https://tailwindcss.com/
// 2 next + tailwind
// https://tailwindcss.com/docs/guides/nextjs

// 3 Start the Tailwind CLI build process
// https://tailwindcss.com/docs/installation
// npx tailwindcss -i ./styles/globals.css -o ./dist/output.css --watch
// 4 color https://tailwindcss.com/docs/customizing-colors
// 5 utility
// https://tailwindcss.com/docs/utility-first
// 6 reusing style
// https://tailwindcss.com/docs/reusing-styles
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp