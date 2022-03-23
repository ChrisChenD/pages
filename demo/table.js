// import {get_table} from '../api/json_lib/get_table'

import { useRouter } from "next/router"
import { useCallback } from "react"

const title_class_tr_selected = 'border-3 border-stone-600 bg-sky-200'
const title_class_th_selected = 'border-2 border-stone-100'
const title_class_tr_unselected = 'border-3 border-stone-600 bg-stone-400'
const title_class_th_unselected = 'border-2 border-stone-100 bg-stone-400'


function select_div(e_list, select_list){
    var selects = new Array()
    var unselects = new Array()
    // console.log('select_div', 'e_list', e_list.length)
    for(let i=0;i < e_list.length;i++){
      if (select_list[i] == true) {
        selects.push(e_list[i])
        // console.log('select+')
      }
      else{
        unselects.push(e_list[i])
        // console.log('unselect+')
      }
    }
    return [selects, unselects]
  }


function select_col(select_func){
    // const record_tr = ''

    function title_class(title_key, e_list, select_list, th_maker){
      const div = select_div(e_list, select_list)
      const selects = div[0]
      const unselects = div[1]
      // return (<tr>
      //   <p>{selects.length}|{unselects.length}</p>
      // </tr>)
      return (
        <tr className={title_class_tr_selected}  key={title_key}>
          {selects.map(
            (e, index)=>(<th className={title_class_th_selected} key={index}>
                {th_maker(index, e, true)}
              </th>
            )
          )}
          {unselects.map(
            (e, index)=>(<th className={title_class_th_unselected}  key={index}>
                {th_maker(index, e, false)}
              </th>
            )
          )}
        </tr>)
    }
    function record(field_list, select_list, record_key){
        const div = select_div(field_list, select_list)
        const selects = div[0]
        const unselects = div[1]
        return (<tr key={record_key}>
          {selects.map(
            (field, index)=>(
              <th key={index}>{field}</th>
            )
          )}
          {unselects.map(
            (field, index)=>(
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
async function upload(url, data) {
    // const body = new URLSearchParams();
    // for (var key in data) {
    //     body.append(key, data[key]);
    // }
    
    // const a = await (await fetch(url, {
    //     method: 'post',
    //     body: body,
    //     // mode: 'no-cors'
    // })
    // )
    // options.body = body
    //     console.log('data', data, typeof(data))
        await (
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                mode: 'no-cors'
            })
            // await fetch(requestUrl, options)
        )
    
    // var options = {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   method: 'POST',
    //   mode: 'no-cors'
    // };
  
    // options.body = new FormData();
    // for (var key in data) {
    //     console.log('data.key', key)
    //     options.body.append(key, data[key]);
    // }
    // console.log('options.body', options.body)
    // for(var pair of options.body.entries()) {
    //     console.log(`body. ${pair[0]}: ${pair[1]}`);
    //   }
      
    // options.body = body
    // console.log('data', data, typeof(data))
    // await (
    //     // await fetch(requestUrl, {
    //     //     method: 'POST',
    //     //     headers: { 'Content-Type': 'application/json' },
    //     //     body: JSON.stringify(data),
    //     //     mode: 'no-cors'
    //     // })
    //     await fetch(requestUrl, options)
    // )

    // return fetch(requestUrl, options)
    // .then(response => {
    // //   return response.json()
    // //     .then(responseJson => {
    // //       //You put some checks here
    // //       return responseJson;
    // //     });
    // });
}


export async function getServerSideProps(context) {
// const {table} = context.query
//   const db_name = table[0]
    const data = await (
    await fetch('http://127.0.0.1:5000/demo/table', {})
    ).json()
    // const data = fetch_json('http://127.0.0.1:5000/'+db_name)
    console.log('getServerSideProps: data', data, typeof(data))
    return {
        props:{
            "table":data
        }
    }
}
function Table3({table}) {
    const router = useRouter()
    console.log('init table', typeof(table), table)
    const select_change = (idx)=>useCallback((e) => {
        // const select_change = useCallback((e) => {
        // e.preventDefault()
        console.log('select_list', table.select_list)
        table.select_list[idx] = table.select_list[idx]==true?false:true
        console.log('select_list', table.select_list)
        // table.select_list[0] = table.select_list[0]==true?false:true
      }, [])
    //   const reload_button = (idx)=>() => {
    const reload_button = async () => {
        console.log('reload_button: table.select_list', table.select_list)
        table.select_list[1] = table.select_list[1]==true?false:true
        console.log('reload_button: table.select_list', table.select_list)
        // const body_data = JSON.stringify(table)
        // console.log('body_data', body_data)
        upload('http://127.0.0.1:5000/demo/table', table)
        // await (
        //     await fetch('http://127.0.0.1:5000/demo/table', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: body_data,
        //         mode: 'no-cors'
        //     })
        // )
        router.push(router.asPath)
        // fetch("http://127.0.0.1:5000/demo/table", {
        //     // method: 'POST',
        //     method: 'GET',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(table),
        // }).then((res) => {
        //     // Do a fast client-side transition to the already prefetched dashboard page
        //     if (res.ok){
        //         router.push(router.asPath)
        //     } 
        //     else{
        //         console.log('Post Fail!')
        //     }
        // })
    }

    const select_changes = [select_change(0), select_change(1), select_change(2)]
    console.log('select_changes', select_changes)
    const col_funcs = select_col(select_change)
    const div = select_div(table.select_list, table.select_list)
    const selects = div[0]
    const unselects = div[1]
    return <div>
        {/* <Table_records {...table}></Table_records> */}
        <div className='prose lg:prose-xl bg-amber-100'>
        <p>hello</p>
        <button onClick={reload_button}>reload_button_</button>
        <table className="table-fixed">
          <thead className='bg-sky-10'>
          {col_funcs['name_list'](table.name_list, table.select_list)}
          {col_funcs['cname_list'](table.cname_list, table.select_list)}
          {col_funcs['type_list'](table.type_list, table.select_list)}
          <tr className={title_class_tr_selected}  key="4">
          {selects.map((e, index)=>
            <th className={title_class_th_selected} key={index}>
                <input type="checkbox" onChange={(e)=>{select_changes[index]}} defaultChecked />
            </th>
          )}
          {unselects.map((e, index)=>
            <th className={title_class_th_unselected}  key={index}>
                <input type="checkbox" onChange={(e)=>{select_changes[index]}}/>
            </th>
            )}
            </tr>
          {col_funcs['cond_list'](table.cond_list, table.select_list)}
          </thead>
          <tbody>
            {table.record_list.map(
              col_funcs['record'](table.select_list),
            )}
          </tbody>
        </table>
      </div>
    </div> 
}
export default Table3;
