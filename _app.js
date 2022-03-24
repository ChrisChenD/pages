import '../styles/globals.css'
// import '../src/input.css'
// import '../styles/Home.module.css'
import '../dist/output.css'


// // 1 例子: https://tailwindcss.com/
// // 2 next + tailwind
// // https://tailwindcss.com/docs/guides/nextjs

// // 3 Start the Tailwind CLI build process
// // https://tailwindcss.com/docs/installation
// // npx tailwindcss -i ./styles/globals.css -o ./dist/output.css --watch
// // 4 color https://tailwindcss.com/docs/customizing-colors
// // 5 utility
// // https://tailwindcss.com/docs/utility-first
// // 6 reusing style
// // https://tailwindcss.com/docs/reusing-styles

// // test add on
// // npm install -D @tailwindcss/typography
// // 7 router 
// // https://nextjs.org/docs/api-reference/next/router#routerevents

// // 8 component level fresh client, no need server
// // https://nextjs.org/docs/basic-features/data-fetching/client-side#client-side-data-fetching-with-useeffect
// 9 refreshing ssp
// https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/


// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

// import { MyContextWrapper } from '../demo/context'; // import based on where you put it
export default function Application({ Component, pageProps }) {
    return (
    // <MyContextWrapper>
        <Component {...pageProps} />
    // </MyContextWrapper>
    )
}
// export default Application


