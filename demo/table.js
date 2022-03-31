// import {get_table} from '../api/json_lib/get_table'

import { useRouter } from "next/router"
import { useCallback, useState, useEffect } from "react"
import {data_fetch} from '../../pages/demo/DataFetch'

function select_div(s_list){
    const good_ilist = []
    const bad_ilist = []
    s_list.map(
        (e, idx)=> e==true?good_ilist.push(idx):bad_ilist.push(idx)
    )
    return [good_ilist, bad_ilist]
}

const title_class_tr_selected = 'border-3 border-stone-600 bg-sky-200'
const title_class_th_selected = 'border-2 border-stone-100'
const title_class_tr_unselected = 'border-3 border-stone-600 bg-stone-400'
const title_class_th_unselected = 'border-2 border-stone-100 bg-stone-400'

function dichotomy_record(record, cookbook){
    return (
        <tr className={cookbook.class}  key={cookbook.key}>
        {cookbook.good.i_list.map(
            (index)=>(<th className={cookbook.good.class} key={index}>
            {cookbook.good.maker([record[index], index])}
            </th>
            )
        )}
        {cookbook.bad.i_list.map(
            (index)=>(<th className={cookbook.bad.class}  key={index}>
            {cookbook.bad.maker([record[index], index])}
            </th>
            )
        )}
        </tr>
    )
}
const base_cookbook = {
    'key':0,
    'class':"title_class_tr_selected",
    'good':{
        'i_list':['good_list'], 
        'class':title_class_th_selected,
        "maker":(e, index)=><p>good</p>
    },
    'bad':{
        'i_list':['bad_list'], 
        'class':title_class_th_unselected,
        "maker":(e, index)=><p>bad</p>
    },
}
function base_record(good_pair, bad_pair, key){
    const cookbook = data_fetch.clone(base_cookbook)
    cookbook.good.i_list = good_pair[0]
    cookbook.bad.i_list = bad_pair[0]
    cookbook.good.maker = good_pair[1]
    cookbook.bad.maker = bad_pair[1]
    cookbook.key = key
    return (record)=>dichotomy_record(record, cookbook)
}
function base_record2(good_pair, bad_pair, key){
    const cookbook = data_fetch.clone(base_cookbook)
    cookbook.good.i_list = good_pair[0]
    cookbook.bad.i_list = bad_pair[0]
    cookbook.good.maker = good_pair[1]
    cookbook.bad.maker = bad_pair[1]
    cookbook.key = key
    cookbook.class = title_class_tr_selected
    return (record)=>dichotomy_record(record, cookbook)
}


export function Table_title(table){
    const [good_ilist, bad_ilist] = select_div(table.select_list)
    
    function simple_title(record, key){
        return base_record(
            [good_ilist, (e, index)=>e[0]],
            [bad_ilist, (e, index)=>e[0]],
            key
        )(record)
    }
    function simple_title2(record, key){
        return base_record2(
            [good_ilist, (e, index)=>e[0]],
            [bad_ilist, (e, index)=>e[0]],
            key
        )(record)
    }
    return (
    <table className="table-fixed">
        <thead className='bg-sky-10'>
        {simple_title(table.name_list, 0)}
        {simple_title(table.cname_list, 1)}
        {simple_title(table.type_list, 2)}
        {base_record(
            [good_ilist, 
                (e)=><input type="checkbox" onChange={table.select_col[e[1]]} defaultChecked />,
            ],
            [bad_ilist, 
                (e)=><input type="checkbox" onChange={table.select_col[e[1]]} />,
            ]
            ,3
        )(table.select_list)}
        {base_record(
            [good_ilist, 
                (e,idx)=><input placeholder={e[0]} />,
            ],
            [bad_ilist, 
                (e,idx)=><input placeholder={e[0]} />,
            ]
            ,4
        )(table.cond_list)}
        </thead>
        <tbody>
            {table.record_list.map(
                (record, index)=>simple_title2(record, 5+index)
            )}
        </tbody>
    </table>
    )
}

function Table3() {
    // const table = getSwr("http://127.0.0.1:5000/demo/table")
    // const url = "http://localhost:5000/demo/table"
    const url = "/backEnd/demo/table"
    // const [table, setTable] = useState(null)
    var { data, isLoading, isError } = data_fetch.swr_get(url)
    var table = data
    const router = useRouter()
    let reload_page = async (table)=>{
        // const { table, error } = useSWR(url, fetcher)
        // table.select_list[1] = table.select_list[1]==true?false:true
        // table.name = `${table.name}+`
        // router.reload()
        console.log('post table.select_list', table.select_list)
        data_fetch.post(url, table)
        window.location.reload(true)
    }
    let switch_select = (idx)=> async ()=>{
        console.log(idx, 'post[0] table.select_list', table.select_list)
        table.select_list[idx] = table.select_list[idx]==true?false:true
        console.log(idx, 'post[1] table.select_list', table.select_list)
        reload_page(table)
    }
    
    // if (error) return <div>Error {error}</div>
    if (isLoading) return <p>loading</p>
    if (!table) return <p>table is empty</p>
    console.log('init table', table)
    console.log('table.name', table.name)
    
    // base_record(
    //     [good_ilist, (e, index)=>e],
    //     [bad_ilist, (e, index)=>e]
    // )(record)
    const [good_ilist, bad_ilist] = select_div(table.select_list)
    return <div>
        <div className='prose lg:prose-xl bg-amber-100'>
        <p>{isLoading==true?"loading":"loading finish!"}</p>
        <button onClick={()=>reload_page(table)}>reload_button_</button>
        <Table_title {...table} select_col={table.select_list.map(
            (e, index)=>switch_select(index)
        )}></Table_title>
        
        </div>
    </div>
}
export default Table3;


