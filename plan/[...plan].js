// task.name
// functor_list
// new_functor_list
// task.op
// 1 /unit/task/task_name
//     task_name
//     src_list:[src, src, ...]
//     out_name:xxx
//     out_sheet:[s1, s2, ...]
// import { route } from "next/dist/server/router"
import { useRouter } from "next/router"
import { useCallback, useState, useEffect } from "react"
import {data_fetch, fetcher} from '../../pages/demo/DataFetch'
// import {Table_info} from '../../pages/unit/lib/table'
import {Table, Table_ext, Table_ext2} from '../../pages/unit/lib/table2'
import {Button_push_text, Button_push} from '../../pages/unit/lib/button'
import {Button} from '../../pages/unit/lib/button'

import useSWR from 'swr'
class Functor{
    constructor(data) {
        // this.data = data
    }
    static html(data){
        if (data.name == 'colAppend')
            return <colAppend.html {...data}></colAppend.html>
        if (data.name == 'readMysql')
            return <readMysql.html {...data}></readMysql.html>
        else
            return <colAppend.html {...data}></colAppend.html>
        // if (data.name == 'colAppend')
        //     return <colAppend {...data}></colAppend>
        // if (data.name == 'colAppend')
        //     return <colAppend {...data}></colAppend>
    }
}

class readMysql {
    constructor(data) {
        this.reload_page = data.reload_page
        this.name = data.name//string
        this.idx = data.idx
        this.data = data
        
        if (data.table_info){
            this.table_chain = `${data.table_info.table_schema}.${data.table_info.table_name}`
        }
    }
    static html(data){var self = new colAppend(data)
        const mysql_chain_inputid = `mysql_chain_inputid-${self.idx}`
        const onkeyup_action = (event) => {
            if(event.key=='Enter'){
                event.preventDefault()
                const mysql_chain = document.getElementById(mysql_chain_inputid).value;
                const data = {
                    "method":"functor_load_chain",
                    "functor_id":self.idx,
                    "db_chain":mysql_chain,
                }
                self.reload_page((raw_data)=>raw_data)(data)
            }
        }
        return <div key='functor'>
            <div className="flex">
                {Button.push({
                    'data':self.name,
                    'reload_page':self.reload_page,
                    'modify_data':(name)=>{
                        return {
                            'method':"functorDel", 
                            'idx':self.idx
                        }
                    },
                    // 'button_name':`X-${self.name}`, 
                    'button_name':`[-]`, 
                })}
                <p>/functor/{self.name}</p>
                <input placeholder={self.table_chain}
                    id={mysql_chain_inputid} 
                    onKeyUp={onkeyup_action}
                />
            </div>
            <Table_ext.html {...self.data}></Table_ext.html>
        </div>
    }
}
class colAppend extends readMysql{
    static html(data){var self = new colAppend(data)
        const mysql_chain_inputid = `mysql_chain_inputid-${self.idx}`
        const onkeyup_action = (event) => {
            if(event.key=='Enter'){
                event.preventDefault()
                const mysql_chain = document.getElementById(mysql_chain_inputid).value;
                const data = {
                    "method":"functor_load_chain",
                    "functor_id":self.idx,
                    "db_chain":mysql_chain,
                }
                self.reload_page((raw_data)=>raw_data)(data)
            }
        }
        return <div key='functor'>
            <div className="flex">
                {Button.push({
                    'data':self.name,
                    'reload_page':self.reload_page,
                    'modify_data':(name)=>{
                        return {
                            'method':"functorDel", 
                            'idx':self.idx
                        }
                    },
                    // 'button_name':`X-${self.name}`, 
                    'button_name':`[-]`, 
                })}
                <p>/functor/{self.name}</p>
                <input placeholder={self.table_chain}
                    id={mysql_chain_inputid} 
                    onKeyUp={onkeyup_action}
                />
            </div>
            <div className="flex">
                
            </div>
            <Table_ext2.html {...self.data}></Table_ext2.html>
        </div>
    }
}

class Functor_new {
    constructor(data) {
        this.name = data.name//string
        this.reload_page = data.reload_page
    }
    static html(data){var self = new Functor_new(data)
        // if data.reload_page
        return <div key='functor_new'>
            <div className="flex">
                <p>[+]</p>
                {Button.push({
                    'data':self.name, 
                    'reload_page':self.reload_page,
                    'modify_data':(name)=>{
                        return {
                            'method':"functorNew", 
                            'functor_name':name
                        }
                    }, 
                    'button_name':`|->${self.name}`, 
                })}
            </div>
        </div>
    }
}
class Plan_op {
    constructor(data) {
        this.name = data.name//string
    }
    static html(data){var self = new Functor(data)
        return <div key='functor'>
            <p>:推送代码到git</p>
            <p>:运行命令</p>
        </div>
    }
}


class Plan {
    constructor(data) {
        // task.name
        // functor_list
        // new_functor_list
        // task.op
        this.name = data.name//string
        this.functor_list = data.functor_list//[string...]
        this.new_functor_list = data.new_functor_list//string
        this.op = data.op// [{name=string,fields=[string...]},...]
        this.reload_page = data.reload_page
    }
    // we use static method 
    static html(data){var self = new Plan(data)
    // html(){
        return (<div key="plan-div">
            <h1>Plan {self.name}</h1>
            {self.functor_list.map(
                (functor, idx)=>{
                    functor.reload_page = self.reload_page
                    functor.idx = idx
                    return <Functor.html key={`functor-html-${idx}`} 
                        {...functor}></Functor.html>
                }
            )}
            {self.new_functor_list.map(
                (new_functor, idx)=>{
                    new_functor.reload_page = self.reload_page
                    return (
                        <Functor_new.html key={`functor-new-html-${idx}`} 
                            {...new_functor}></Functor_new.html>
                    )
                }
                // <Functor_new.html key='functor-new-html' {...new_functor}></Functor_new.html>
            )}
            <Plan_op.html key='op-html' {...self.op}></Plan_op.html>
        </div>)
        // var button2_attr = {
        //     'data':task_info, 
        //     'reload_page':task_info.reload_page,
        //     'modify_data':(new_data, value)=>{task_info.src_list.push(value);return task_info}, 
        //     'button_name':"add src", 
        //     'input_id':"add src"
        // }
        // var button_attr =(src, idx)=> ({
        //     'data':task_info, 
        //     'reload_page':task_info.reload_page,
        //     'modify_data':((idx)=>(task_info)=>{
        //         task_info.src_list.splice(idx, 1)
        //         return task_info
        //     })(idx), 
        //     'button_name':`|->${src}`, 
        //     'input_id':"add src"
        // })
        // return <div key='task_info'>
        //     <h1>Task_info</h1>
        //     <p>/task_name [{task_info.task_name}]</p>
        //     <p>/src</p>
        //     {task_info.src_list.map(
        //         (src, idx)=><div key={`src_list-${src}`} className='flex'>
        //             {/* <Button.push {...button_attr(src, idx)}></Button.push><a><p>/src/{src}</p></a></div> */}
        //             {Button.push({
        //                 'data':task_info, 
        //                 'reload_page':task_info.reload_page,
        //                 'modify_data':((idx)=>(task_info)=>{
        //                     task_info.src_list.splice(idx, 1)
        //                     return task_info
        //                 })(idx), 
        //                 'button_name':`|->${src}`, 
        //             })}
        //             <a><p>/src/{src}</p></a></div>
        //     )}
        //     {/* <Button.push_text {...button2_attr}></Button.push_text> */}
        //     {Button.push_text({
        //         'data':task_info, 
        //         'reload_page':task_info.reload_page,
        //         'modify_data':(new_data, value)=>{task_info.src_list.push(value);return task_info}, 
        //         'button_name':"add src", 
        //         'input_id':"add src"
        //     })}
        //     <p>/out</p>
        //     <p>/out/name [{task_info.out_name}]</p>
        //     <p>/out/sheet</p>
        //     {task_info.out_sheet.map(
        //         (sheet)=><div key={`sheet-${sheet.name}`}>
        //             <p>/out/sheet/{sheet.name}</p>
        //             {sheet.fields.map(
        //                 (field)=><p>/out/sheet/{field}</p>
        //             )}
        //         </div>
        //     )}
        // </div>
    }
}

function DataModule(){
    const router = useRouter()
    var {plan} = router.query
    const url = `/backEnd/plan/${plan}`//+router.asPath
    // this branch check lead to 
    // Warning: React has detected a change in the order of Hooks called by DataModule.
    if (!plan) return <p>plan is undefined</p>

    var { data, isLoading, isError } = data_fetch.swr_get(url)
    if (isLoading) return <p>loading</p>
    if (!data) return <p>data is empty</p>
    data.reload_page = (update_data) => async (data)=>{
        var new_data = update_data(data)
        data_fetch.post(url, new_data)
        window.location.reload(true)
    }
    console.log('data', data)
    // var task = new Task(data)
    return (<div>
        {/* <component.html></component.html> */}
        {/* {component.html()} */}
        <Plan.html {...data}></Plan.html>
        {/* <task.html {...data}></task.html> */}
        {/* <Module_info {...data}></Module_info> */}
        {/* <Task_info {...data}></Task_info> */}
    </div>
    )
}

export default DataModule;



