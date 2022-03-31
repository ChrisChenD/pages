// 1 /unit/task/task_name
//     task_name
//     src_list:[src, src, ...]
//     out_name:xxx
//     out_sheet:[s1, s2, ...]

import { route } from "next/dist/server/router"
import { useRouter } from "next/router"
import { useCallback, useState, useEffect } from "react"
import {data_fetch} from '../../../pages/demo/DataFetch'
import {Table_info} from '../../../pages/unit/lib/table'
import {Button_push_text, Button_push} from '../../../pages/unit/lib/button'

function Task_info(task_info){
    // task_info.task_name = 'xxx'
    // task_info.src_list = [src, ...src],
    // task_info.out_name = 'xxx'
    // task_info.out_sheet = [
    //     sheet = {
    //         name = '',
    //         fields = [field, ...field]
    //     }    
    // ]
    // var {data, modify_data, button_name, input_name} = attr.query
    // var new_data = modify_data(new_data, value)


    // var Button_attr = {
    //     "data":,
    //     "modify_data":,// var new_data = attr.modify_data(new_data)
    //     "button_name":,
    // }

    var button2_attr = {
        'data':task_info, 
        'modify_data':(new_data, value)=>{task_info.src_list.push(value);return task_info}, 
        'button_name':"add src", 
        'input_id':"add src"
    }

    return <div key='task_info'>
        <h1>Task_info</h1>
        <p>/task_name [{task_info.task_name}]</p>
        <p>/src</p>
        {task_info.src_list.map(
            (src, idx)=><div key={`src_list-${src}`} className='flex'><Button_push
            button_name={`|->${src}`} data={task_info} modify_data={((idx)=>(task_info)=>{
                console.log('idx', idx)
                console.log('task_info.src_list', task_info.src_list)
                task_info.src_list.splice(idx, 1)
                console.log('task_info.src_list', task_info.src_list)
                return task_info
            })(idx)}
            ></Button_push><a><p>/src/{src}</p></a></div>
        )}
        <Button_push_text {...button2_attr}></Button_push_text>
        <p>/out</p>
        <p>/out/name [{task_info.out_name}]</p>
        <p>/out/sheet</p>
        {task_info.out_sheet.map(
            (sheet)=><div key={`sheet-${sheet.name}`}>
                <p>/out/sheet/{sheet.name}</p>
                {sheet.fields.map(
                    (field)=><p>/out/sheet/{field}</p>
                )}
            </div>
        )}
    </div>
    // <button className="bg-stone-700 border-4 text-white" onClick={module.reload_page(
    //     ()=>{
    //         var new_module = data_fetch.clone(module)
    //         new_module.info = document.getElementById(input_id).value
    //         console.log('reload_page: module', new_module)
    //         return new_module
    //     }
    // )}> @modify module@ </button>
}

function DataModule(){
    const router = useRouter()
    var {task_name} = router.query
    const url = `/backEnd/unit/task/${task_name}`//+router.asPath
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
        <Task_info {...data}></Task_info>
        {/* <Module_info {...data}></Module_info> */}
        {/* <Table_info {...data}></Table_info> */}
    </div>
    )
}

export default DataModule;

