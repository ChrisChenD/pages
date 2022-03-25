// import {get_table} from '../api/json_lib/get_table'

import { useRouter } from "next/router"
import { useCallback, useState, useEffect } from "react"
import useSWR from 'swr'
import { fuchsia } from "tailwindcss/colors"
const fetcher = async (...args) => await fetch(...args).then(async (res) => {
  console.log('res.ok', res.ok)
  console.log('res.error', res.error)
  console.log('args', args)
  var data = await res.json()
  console.log('data', data)
  return data
})
// const fetcher = (...args) => fetch(...args).then(res => res.json())


const title_class_tr_selected = 'border-3 border-stone-600 bg-sky-200'
const title_class_th_selected = 'border-2 border-stone-100'
const title_class_tr_unselected = 'border-3 border-stone-600 bg-stone-400'
const title_class_th_unselected = 'border-2 border-stone-100 bg-stone-400'

async function upload(url, data){
    await (
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            mode: 'no-cors'
        })
        // await fetch(requestUrl, options)
    )
}

function getSwr (url) {
    var { data, error } = useSWR(url, fetcher)
    return {
      table: data,
      isLoading: !error && !data,
      isError: error
    }
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
export function table_title(table){
    
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
    var { table, isLoading, isError } = getSwr(url)
    
    // setTable((table)=>data)
    // const url = "http://127.0.0.1:3000/demo/tailwind"
    // const { table, error } = useSWR(url, fetcher)
    // const [table, setTable] = useState(null)
    // const [isLoading, setLoading] = useState(false)

    // useEffect(() => {
    //   setLoading(true)
    //   fetch(url)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         setTable(data)
    //         setLoading(false)
    //     })
    // }, [setTable, setLoading, url])

    const router = useRouter()
    let reload_page = async ()=>{
        // const { table, error } = useSWR(url, fetcher)
        table.select_list[1] = table.select_list[1]==true?false:true
        table.name = `${table.name}+`
        upload(url, table)
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
        {/* <table_title {...table}></table_title> */}
        {table.select_list.map((b, idx)=>b==true?(
            <p key={idx}>true</p>
        ):(
            <p key={idx}>False</p>
        ))}
        </div> 
        </div> 
}
export default Table3;


