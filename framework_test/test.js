

import useSWR from 'swr'
import { useRouter } from "next/router"
import { useCallback, useState, useEffect } from "react"
import {data_fetch, fetcher} from '../../pages/demo/DataFetch'
// import {Table_info} from '../../pages/unit/lib/table'
// import {Table, Table_ext, Table_ext2} from '../../pages/unit/lib/table2'
// import {Button_push_text, Button_push} from '../../pages/unit/lib/button'
// import {Button} from '../../pages/unit/lib/button'
// import {Plan} from './libs/module'

function Page({ data }) {
    // Render data...
}
  
// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const url = `http://127.0.0.1:5000/new_framework/test`//+router.asPath
    const res = await fetch(url)
    const data = await res.json()

    // Pass data to the page via props
    return { props: { data } }
}
  
export default Page
  





// export async function getServerSideProps(context) {
//     console.log('context', context)
//     return {
//         props: {

//         }, // will be passed to the page component as props
//     }
// }
  

// function DataModule(props){
//     console.log('props', props)
//     const router = useRouter()
//     // var {plan} = router.query
//     // const url = `/backEnd/new_framework/test`//+router.asPath
//     // console.log('data', data)
    
//     // this branch check lead to 
//     // Warning: React has detected a change in the order of Hooks called by DataModule.
//     // if (!plan) return <p>plan is undefined</p>

//     // var { data, isLoading, isError } = data_fetch.swr_get(url)
//     // console.log('data', data)
//     // return <p>data.name [{data.name}]</p>
//     return <p>data.name: 123</p>    
//     // data.call = (call_param) => async ()=>{
//     //     // var new_data = update_data(data)
//     //     data_fetch.post(url, call_param)
//     //     window.location.reload(true)
//     // }
//     // return <p>data.name [123]</p>
    
//     if (isLoading) return <p>loading</p>
//     if (!data) return <p>data is empty</p>
//     // data.call = (update_data) => async (data)=>{
//     //     var new_data = update_data(data)
//     //     data_fetch.post(url, new_data)
//     //     window.location.reload(true)
//     // }    
//     data.call = (call_param) => async ()=>{
//         // var new_data = update_data(data)
//         data_fetch.post(url, call_param)
//         window.location.reload(true)
//     }
//     console.log('data', data)
//     return (<div>
//         <Plan.view {...data}></Plan.view>
//     </div>
//     )
// }

// export default DataModule;



