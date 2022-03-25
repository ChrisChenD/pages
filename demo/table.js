// import {get_table} from '../api/json_lib/get_table'

import { useRouter } from "next/router"
import { useCallback, useState, useEffect } from "react"
import {data_fetch} from '../../pages/demo/DataFetch'

function div_list(e_list, classify_map){
  const r = {}
  for(let [k,match_k] in classify_map.entries()){
    r.setAttribute(k, []) 
    for (let [index, e] in e_list.entries()){
      if (match_k(e))
        r.getAttribute(k).push(index)
    }
  }
  return r
}
function select_div(s_list){
  const r = div_list(s_list, {'selects':(e)=>e==true, 'unselects':(e)=>e==false})
  return [r.selects, r.unselects]
}

function title_class(title_key, e_list, select_list, th_maker){
    const [selects, unselects] = select_div(select_list)
    return (
        <tr className={title_class_tr_selected}  key={title_key}>
        {selects.map(
            (index)=>(<th className={title_class_th_selected} key={index}>
            {th_maker(index, e_list[index], true)}
            </th>
            )
        )}
        {unselects.map(
            (e, index)=>(<th className={title_class_th_unselected}  key={index}>
            {th_maker(index, e_list[index], false)}
            </th>
            )
        )}
        </tr>
    )
}
export function Table_title(table){
    
    const col_funcs = {
        'name_list':(e_list, select_list)=>title_class(1, e_list, select_list, (i,name, selected)=>(name)),
        'cname_list':(e_list, select_list)=>title_class(2, e_list, select_list, (i,name, selected)=>(name)),
        'type_list':(e_list, select_list)=>title_class(3, e_list, select_list, (i,name, selected)=>(name)),
    }
    return (
    <table className="table-fixed">
        <thead className='bg-sky-10'>
        {col_funcs['name_list'](table.name_list, table.select_list)}
        {col_funcs['cname_list'](table.cname_list, table.select_list)}
        {col_funcs['type_list'](table.type_list, table.select_list)}
        </thead>
    </table>
    )
}

// function Table3({table}) {
function Table3() {
    // const table = getSwr("http://127.0.0.1:5000/demo/table")
    // const url = "http://localhost:5000/demo/table"
    const url = "/backEnd/demo/table"
    // const [table, setTable] = useState(null)
    var { table, isLoading, isError } = data_fetch.swr_get(url)
    
    const router = useRouter()
    let reload_page = async ()=>{
        // const { table, error } = useSWR(url, fetcher)
        table.select_list[1] = table.select_list[1]==true?false:true
        table.name = `${table.name}+`
        data_fetch.post(url, table)
        // router.reload()
        window.location.reload(true)
    }
    
    // if (error) return <div>Error {error}</div>
    if (isLoading) return <p>loading</p>
    if (!table) return <p>table is empty</p> 
    console.log('init table', table)
    console.log('table.name', table.name)
    
    return <div>
        <div className='prose lg:prose-xl bg-amber-100'>
        <p>-- |{table.name}|--</p>
        <p>{isLoading==true?"loading":"loading finish!"}</p>
        <button onClick={()=>reload_page()}>reload_button_</button>
        <Table_title {...table}></Table_title>
        {table.select_list.map((b, idx)=>b==true?(
            <p key={idx}>true</p>
        ):(
            <p key={idx}>False</p>
        ))}
        </div> 
        </div> 
}
export default Table3;
