// import {get_table} from '../api/json_lib/get_table'

import { useRouter } from "next/router"
import { useCallback, useState, useEffect } from "react"
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then((res) => {
  console.log('res', res.ok, res.error)
  console.log('args', args)
  return res.json()
})




const title_class_tr_selected = 'border-3 border-stone-600 bg-sky-200'
const title_class_th_selected = 'border-2 border-stone-100'
const title_class_tr_unselected = 'border-3 border-stone-600 bg-stone-400'
const title_class_th_unselected = 'border-2 border-stone-100 bg-stone-400'


function select_div(select_list){
    var selects = new Array()
    var unselects = new Array()
    // console.log('select_div', 'e_list', e_list.length)
    for(let i=0;i < select_list.length;i++){
      if (select_list[i] == true) {
        selects.push(i)
        // console.log('select+')
      }
      else{
        unselects.push(i)
        // console.log('unselect+')
      }
    }
    return [selects, unselects]
  }


function select_col(select_func){
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
                {/* {th_maker(index, e, false)} */}
                {th_maker(index, e_list[index], false)}
              </th>
            )
          )}
        </tr>)
    }
    function record(field_list, select_list, record_key){
        const [selects, unselects] = select_div(select_list)
        return (<tr key={record_key}>
          {selects.map(
            (index)=>(
              <th key={index}>{field_list[index]}</th>
            )
          )}
          {unselects.map(
            (index)=>(
              <th className={title_class_th_unselected}  key={index}></th>
            )
          )}
        </tr>)
      }
      
      // id_list = Array.from(select_list.keys(), (value, index)=>index);
      return {
        'name_list':(e_list, select_list)=>title_class(1, e_list, select_list, (i,name, selected)=>(name)),
        'cname_list':(e_list, select_list)=>title_class(2, e_list, select_list, (i,name, selected)=>(name)),
        'type_list':(e_list, select_list)=>title_class(3, e_list, select_list, (i,name, selected)=>(name)),
        'select_list':(e_list, select_list)=>title_class(4, select_list, select_list, 
          (idx, _selected, selected)=>selected==true?(
          <input type="checkbox" onChange={(e)=>{select_func(idx)}} defaultChecked />):(
            <input type="checkbox" onChange={(e)=>{select_func(idx)}}/>
          )
        ),
        'cond_list':(e_list, select_list)=>title_class(5, e_list, select_list,
          (idx, cond, selected)=><input placeholder={cond}/>
        ),
        'record':(select_list)=>(
          (field_list, index)=>record(field_list, select_list, index)
        )
      }
    }
    
// function Table_records(props_demo){
//     const col_funcs = select_col(props_demo.select_change)
//     console.log('props_demo.select_list', props_demo.select_list)
//     console.log('props_demo.keys', typeof(props_demo))
//     return (
//       <div className='prose lg:prose-xl bg-amber-100'>
//         <table className="table-fixed">
//           <thead className='bg-sky-10'>
//           {col_funcs['name_list'](props_demo.name_list, props_demo.select_list)}
//           {col_funcs['cname_list'](props_demo.cname_list, props_demo.select_list)}
//           {col_funcs['type_list'](props_demo.type_list, props_demo.select_list)}
//           {col_funcs['select_list'](props_demo.select_list, props_demo.select_list)}
//           {col_funcs['cond_list'](props_demo.cond_list, props_demo.select_list)}
//           </thead>
//           <tbody>
//             {props_demo.record_list.map(
//               col_funcs['record'](props_demo.select_list),
//             )}
//           </tbody>
//         </table>
//       </div>
//       )
//   }

export async function getServerSideProps() {
  // const url = "http://localhost:5000/demo/table"
  // const url = "http://localhost:3000/backEnd/demo/table"
  const url = 'http://localhost:3000/backEnd/demo/table'
  // const url = "http://localhost:3000/backEnd/demo/table"
  // const url = "/backEnd/demo/table"
  const data = await (
    await fetch(url, {})
    ).json()
    console.log('getServerSideProps: data', data, typeof(data))
    return {
        props:{
            "sv_data":data
        }
    }
}
// function Table3({table}) {
function Table3({sv_data}) {
    // const table = getSwr("http://127.0.0.1:5000/demo/table")
    // const url = "http://localhost:5000/demo/table"
    const url = "/backEnd/demo/table"
    // const url = "http://127.0.0.1:3000/demo/tailwind"
    // const { table, error } = useSWR(url, fetcher)
    const [table, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
      setLoading(true)
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          setLoading(false)
        })
    }, [setData, setLoading, url])

    console.log('init table', typeof(table), table)
    console.log('loading', isLoading)
    console.log('sv_data', sv_data)
    
    // console.log('error', error, typeof(error))
    return <div>isLoading: {isLoading==true?'true':'false'}</div>
    // const router = useRouter()
    // const select_change = (idx)=>useCallback((e) => {
    //     // const select_change = useCallback((e) => {
    //     // e.preventDefault()
    //     console.log('select_list', table.select_list)
    //     table.select_list[idx] = table.select_list[idx]==true?false:true
    //     console.log('select_list', table.select_list)
    //     // table.select_list[0] = table.select_list[0]==true?false:true
    //   }, [])
    //   const reload_button = (idx)=>() => {
    // const reload_button = async () => {
    //     console.log('reload_button: table.select_list', table.select_list)
    //     table.select_list[1] = table.select_list[1]==true?false:true
    //     console.log('reload_button: table.select_list', table.select_list)
    //     upload('http://127.0.0.1:5000/demo/table', table)
    //     // router.push(router.asPath)
    //     // router.reload()
    //     // window.location.reload(true)
    //     // window.location.reload(false)
    //     // location.reload(true)
    //     window.location = router.asPath

    // }

    // // const select_changes = [select_change(0), select_change(1), select_change(2)]
    // // console.log('select_changes', select_changes)
    // const col_funcs = select_col(reload_button)
    // const [selects, unselects] = select_div(table.select_list)
    // console.log('table.select_list', table.select_list)
    // console.log('selects', selects)
    // console.log('unselects', unselects)
    // return <div>
    //     {/* <Table_records {...table}></Table_records> */}
    //     <div className='prose lg:prose-xl bg-amber-100'>
    //     <p>hello</p>
    //     <button onClick={reload_button}>reload_button_</button>
    //     <table className="table-fixed">
    //       <thead className='bg-sky-10'>
    //       {col_funcs['name_list'](table.name_list, table.select_list)}
    //       {col_funcs['cname_list'](table.cname_list, table.select_list)}
    //       {col_funcs['type_list'](table.type_list, table.select_list)}
    //       <tr className={title_class_tr_selected}  key="4">
    //       {selects.map((index)=>
    //         <th className={title_class_th_selected} key={index}>
    //             <input type="checkbox" onChange={(e)=>{reload_button}} defaultChecked />
    //         </th>
    //       )}
    //       {unselects.map((index)=>
    //         <th className={title_class_th_unselected}  key={index}>
    //             <input type="checkbox" onChange={(e)=>{reload_button}}/>
    //         </th>
    //         )}
    //         </tr>
    //       {col_funcs['cond_list'](table.cond_list, table.select_list)}
    //       </thead>
    //       <tbody>
    //         {table.record_list.map(
    //           col_funcs['record'](table.select_list),
    //         )}
    //       </tbody>
    //     </table>
    //   </div>
    // </div> 
}
export default Table3;
