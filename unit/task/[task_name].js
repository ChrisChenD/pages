// 1 /unit/task/task_name
//     task_name
//     src_list:[src, src, ...]
//     out_name:xxx
//     out_sheet:[s1, s2, ...]

// import { route } from "next/dist/server/router"
import { useRouter } from "next/router"
import { useCallback, useState, useEffect } from "react"
import {data_fetch, fetcher} from '../../../pages/demo/DataFetch'
import {Table_info} from '../../../pages/unit/lib/table'
import {Button_push_text, Button_push} from '../../../pages/unit/lib/button'
import {Button} from '../../../pages/unit/lib/button'
import useSWR from 'swr'

class Task {
    constructor(data) {
        console.log('init data:', data)
        this.task_name = data.task_name//string
        this.src_list = data.src_list//[string...]
        this.out_name = data.out_name//string
        this.out_sheet = data.out_sheet// [{name=string,fields=[string...]},...]
        this.reload_page = data.reload_page
    }
    // we use static method 
    static html(data){var task_info = new Task(data)
    // html(){
        // var task_info = new Task(data)
        // var task_info = this
        console.log('html.task_info', task_info)
        // var button2_attr = {
        //     'data':task_info, 
        //     'reload_page':task_info.reload_page,
        //     'modify_data':(new_data, value)=>{task_info.src_list.push(value);return task_info}, 
        //     'button_name':"add src", 
        //     'input_id':"add src"
        // }
        var button_attr =(src, idx)=> ({
            'data':task_info, 
            'reload_page':task_info.reload_page,
            'modify_data':((idx)=>(task_info)=>{
                console.log('idx', idx)
                console.log('task_info.src_list', task_info.src_list)
                task_info.src_list.splice(idx, 1)
                console.log('task_info.src_list', task_info.src_list)
                return task_info
            })(idx), 
            'button_name':`|->${src}`, 
            'input_id':"add src"
        })
        return <div key='task_info'>
            <h1>Task_info</h1>
            <p>/task_name [{task_info.task_name}]</p>
            <p>/src</p>
            {task_info.src_list.map(
                (src, idx)=><div key={`src_list-${src}`} className='flex'>
                    {/* <Button.push {...button_attr(src, idx)}></Button.push><a><p>/src/{src}</p></a></div> */}
                    {Button.push({
                        'data':task_info, 
                        'reload_page':task_info.reload_page,
                        'modify_data':((idx)=>(task_info)=>{
                            console.log('idx', idx)
                            console.log('task_info.src_list', task_info.src_list)
                            task_info.src_list.splice(idx, 1)
                            console.log('task_info.src_list', task_info.src_list)
                            return task_info
                        })(idx), 
                        'button_name':`|->${src}`, 
                    })}
                    <a><p>/src/{src}</p></a></div>
            )}
            {/* <Button.push_text {...button2_attr}></Button.push_text> */}
            {Button.push_text({
                'data':task_info, 
                'reload_page':task_info.reload_page,
                'modify_data':(new_data, value)=>{task_info.src_list.push(value);return task_info}, 
                'button_name':"add src", 
                'input_id':"add src"
            })}
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
    }
}

function DataModule(){
    const router = useRouter()
    var {task_name} = router.query
    const url = `/backEnd/unit/task/${task_name}`//+router.asPath
    console.log('url', url)
    // this branch check lead to 
    // Warning: React has detected a change in the order of Hooks called by DataModule.
    if (!task_name) return <p>task_name is undefined</p>

    var { data, isLoading, isError } = data_fetch.swr_get(url)
    if (isLoading) return <p>loading</p>
    if (!data) return <p>data is empty</p>
    console.log('data', data)
    data.reload_page = (update_data) => async (data)=>{
        var new_data = update_data(data)
        data_fetch.post(url, new_data)
        window.location.reload(true)
    }
    
    // var task = new Task(data)
    return (<div>
        {/* <component.html></component.html> */}
        {/* {component.html()} */}
        <Task.html {...data}></Task.html>
        {/* <task.html {...data}></task.html> */}
        {/* <Module_info {...data}></Module_info> */}
        {/* <Task_info {...data}></Task_info> */}
    </div>
    )
}

export default DataModule;



