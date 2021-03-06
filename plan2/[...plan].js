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

// import {Plan_auto} from './libs/common_module'
import {Plan2_view} from './libs/module_view'
import {Parser} from './libs/compo'
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
                    'button_name':`[X]`, 
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
        console.log('colAppend:data', data)
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
    //     def set_append_key(self, field_id):
    //     self.base_data['append_key'] = self.base_data['select_list'][field_id]
    // def set_root_key(self, prev_id):

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
                    'button_name':`[X]`, 
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
        this.reload_page = data.reload_page
        this.name = data.name//string
    }
    static html(data){var self = new Plan_op(data)
        // console.log('self', self)
        // console.log('data', data)
        
        // return <p>plan_op_debug</p>
        return <div key='functor'>
            {Button.biu({
                'button_name':"CODE_GENERATE", 
                'reload_page':self.reload_page,
                'data':{
                    'method':"make_code", 
                },
            })}
            {Button.biu({
                'button_name':"??????plan", 
                'reload_page':self.reload_page,
                'data':{
                    'method':"save_plan", 
                },
            })}
            {Button.biu({
                'button_name':"??????plan", 
                'reload_page':self.reload_page,
                'data':{
                    'method':"load_plan", 
                },
            })}
            
            <p>:???????????????git</p>
            <p>:????????????</p>
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
        this.auto_code = data.auto_code
        this.reload_page = data.reload_page
    }
    // we use static method 
    static html(data){var self = new Plan(data)
    // html(){
        var op = data_fetch.clone(self.op)
        op.reload_page = self.reload_page 
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
            <Plan_op.html key='op-html' {...op}></Plan_op.html>
            <div key='auto_code'>
                <textarea 
                    // className="w-96 h-auto"
                    rows="40" cols="80"
                    defaultValue={self.auto_code}>
                    </textarea>
            </div>
        </div>)
    }
    static view(data){var self = new Plan(data)
        return <div className={self.name} key={self.key}>
            <h1>Plan {self.name}</h1>
            {self.functor_list.map(
                (functor, idx)=>{
                    return <Functor.view key={`functor-html-${idx}`} 
                        {...functor}></Functor.view>
                }
            )}
        </div>
    }
}



function DataModule(){
    // var data = {}
    const router = useRouter()
    var {plan} = router.query
    const url = `/backEnd/plan/${plan}`//+router.asPath
    if (!plan) return <p>plan is undefined</p>

    var { data, isLoading, isError } = data_fetch.swr_get(url)
    if (isLoading) return <p>loading</p>
    if (!data) return <p>data is empty</p>
    data.post_call = (data) => async ()=>{
        data_fetch.post(url, data)
        window.location.reload(true)
    }
    console.log('data', data)
    return (<div>
        {/* <Plan2_view.html {...data}></Plan2_view.html> */}
        <Plan2_view {...data}></Plan2_view>
    </div>
    )
}

export default DataModule;



