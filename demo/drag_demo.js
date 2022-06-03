
import useSWR from 'swr'
import { useRouter } from "next/router"
import { useCallback, useState, useEffect } from "react"
import {data_fetch, fetcher} from '../../pages/demo/DataFetch'
// import {Table_info} from '../../pages/unit/lib/table'
// import {Table, Table_ext, Table_ext2} from '../../pages/unit/lib/table2'
// import {Button_push_text, Button_push} from '../../pages/unit/lib/button'
// import {Button} from '../../pages/unit/lib/button'
// import {Plan} from './libs/module'

function DataModule(){
    // const {plan, SetPlan} = useState(0)
    // const router = useRouter()
    // var {plan} = router.query
    // const url = `/backEnd/plan/${plan}`//+router.asPath
    // // this branch check lead to 
    // // Warning: React has detected a change in the order of Hooks called by DataModule.
    // if (!plan) return <p>plan is undefined</p>

    // var { data, isLoading, isError } = data_fetch.swr_get(url)
    // if (isLoading) return <p>loading</p>
    // if (!data) return <p>data is empty</p>
    // data.call = (update_data) => async (data)=>{
    //     var new_data = update_data(data)
    //     data_fetch.post(url, new_data)
    //     window.location.reload(true)
    // }    
    // data.call = (call_param) => async ()=>{
    //     // var new_data = update_data(data)
    //     data_fetch.post(url, call_param)
    //     window.location.reload(true)
    // }
    // console.log('data', data)
    return (
    // <div className='w-full h-full'>
    <div className="relative bg-stone-700">
    {/* <div className='flex bg-stone-700'>  */}
  {/* <div class="fixed top-0 left-0 right-0">Contacts</div> */}
        {/* <Plan.view {...data}></Plan.view> */}
        {/* <div className='flex'> */}
            {/* <div className='flex-initial w-1/5 h-full bg-stone-500'> */}
            <div className="absolute top-0 left-0 w-1/5 h-[120] ">
                <div className='bg-stone-500'>
                    <p className='bg-stone-500'>hi</p>
                </div>
            </div>
            <div className="absolute top-0 left-1/5 w-3/5 h-[123] ">
                <div className='bg-sky-500'>
            {/* <div className='flex-initial w-3/5 h-full bg-sky-500'> */}
                <p className=' h-80'>hello</p>
                </div>
            </div>
            <div className="absolute top-0 right-0 w-1/5 h-full ">
            {/* <div className='flex-initial w-1/5 h-full bg-stone-500'> */}
                <div className='bg-stone-500'>
                {[...Array(10)].map(
                    (n,idx)=><p key={idx} className='h-20 '>hi3</p>
                )}
                </div >
            </div>
        {/* </div> */}
    </div>

    // </div>
    )
}

export default DataModule;


// http://109.244.159.137:3000/demo/drag_demo