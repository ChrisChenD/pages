// /unit/create_module/db152.xxx
// import {get_table} from '../api/json_lib/get_table'

import { route } from "next/dist/server/router"
import { useRouter } from "next/router"
import { useCallback, useState, useEffect } from "react"
import {data_fetch} from '../../../pages/demo/DataFetch'
import {Table_info} from '../../../pages/unit/lib/table'

function Module_info(module){
    const input_id = 'module_info_id'
    return <div>
        <div>
            <h1>table [{module.db_table_name}]</h1>
        {/* </div>
        <div> */}
            <button className="bg-stone-700 border-4 text-white" onClick={module.reload_page(
                ()=>{
                    var new_module = data_fetch.clone(module)
                    new_module.info = document.getElementById(input_id).value
                    console.log('reload_page: module', new_module)
                    return new_module
                }
            )}> @modify module@ </button>
            <p>DDL:</p>
            <input id={input_id} placeholder="input module DDL..."/>

        </div>
    </div>
}

function DataModule(){
    const router = useRouter()
    var {src} = router.query
    const url = `/backEnd/unit/task_src/${src}`//+router.asPath
    // console.log('url', url)
    var { data, isLoading, isError } = data_fetch.swr_get(url)
    if (isLoading) return <p>loading</p>
    if (!data) return <p>data is empty</p>
    
    data.reload_page = (update_data) => async (data)=>{
        var new_data = update_data(data)
        data_fetch.post(url, new_data)
        window.location.reload(true)
    }

    return (<div>
        <Module_info {...data}></Module_info>
        <Table_info {...data}></Table_info>
    </div>
    )
}

export default DataModule;



