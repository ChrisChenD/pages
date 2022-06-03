
import useSWR from 'swr'
import { useRouter } from "next/router"
import { useCallback, useState, useEffect } from "react"
import {data_fetch, fetcher} from './DataFetch'
import Script from 'next/script'


function key_down(e){
    console.log('key:', e.key)
}

function Note(){
  console.log('Note!')
}

function Canvas(data){
  return <button id='canvas'
    onClick={Note}
  >{data.value}</button>
}


function DataModule(){
    const {data, setData} = useState(0)
    // console.log('hello')
    var init_proc = `
      console.log('hello')
      function f_init(){
        console.log('onLoad exec!')
        // setData({
        //   value:'123'
        // })
        var p = document.getElementById('canvas');
        console.log('p', p, typeof(p))
        p.textContent = 123
        console.log('p', p, typeof(p))
      }
      f_init();
    `
    return (<>
        <Script
          id="stripe-js"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: init_proc
          }}
        />
        <Canvas></Canvas>
    </>)
}

export default DataModule;
          // src="https://js.stripe.com/v3/"
          // onLoad={() => {
          //   console.log('onLoad exec!')
          //   p = document.getElementById('note');
          //   p.value = 123
            // setStripe({ stripe: window.Stripe('pk_test_12345') })
          // }}

// (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
// new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
// j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
// 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
// })(window,document,'script','dataLayer', '${GTM_ID}');

// <div>
    //     {/* <Plan.view {...data}></Plan.view> */}
    //     <p>hello2</p>
    //     <button className='border-4'
    //         // onClick={key_down}
    //         onKeyUp={key_down}
    //     >
    //         key_down
    //     </button>
    //     <div className='border-4'>
    //         <canvas id='canvas'
    //             onKeyDown={key_down}
    //             onClick={key_down}
    //         >
    //         </canvas>
    //     </div>
    // </div>
