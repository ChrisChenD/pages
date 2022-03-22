// @refresh reset
import { useEffect, setLoading } from 'react'
// export function Note(props){
//     return (
//       <div>
//         <h2> Note </h2>
//         {props.children}
//         {Object.keys(props).map(
//           (name)=><p>{name}</p>
//         )}
//       </div>
//     )
//   }


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
  const title_class_tr_selected = 'border-3 border-stone-600 bg-sky-200'
  const title_class_th_selected = 'border-2 border-stone-100'
  const title_class_tr_unselected = 'border-3 border-stone-600 bg-stone-400'
  const title_class_th_unselected = 'border-2 border-stone-100'
  
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

function table_demo(){
  return {
    'name_list':['Artist', 'Song', 'Year'],
    'cname_list': ['艺术家', '歌曲', '年份'],
    'type_list' : ['<char8>', '<char8>', '<char4>'],
    'select_list' : [false,false,true],
    'cond_list' : ['>0','=fire','=None'],
    'record_list' : [
      ['The Sliding Mr. Bones (Next Stop, Pottersville)', 'Malcolm Lockyer', '1961'],
      ['Witchy Woman', 'The Eagles', '1972'],
      ['Shining Star', 'Earth, Wind, and Fire', '1975'],
      ['Witchy Woman', 'The Eagles', '1972'],
      ['Shining Star', 'Earth, Wind, and Fire', '1975'],
      ['Witchy Woman', 'The Eagles', '1972'],
      ['Shining Star', 'Earth, Wind, and Fire', '1975'],
      ['Witchy Woman', 'The Eagles', '1972'],
      ['Shining Star', 'Earth, Wind, and Fire', '1975'],
      ['Witchy Woman', 'The Eagles', '1972'],
      ['Shining Star', 'Earth, Wind, and Fire', '1975'],
      ['Witchy Woman', 'The Eagles', '1972'],
      ['Shining Star', 'Earth, Wind, and Fire', '1975'],
      ['Witchy Woman', 'The Eagles', '1972'],
      ['Shining Star', 'Earth, Wind, and Fire', '1975'],
    ],
  }
}

export function Table_records(props_demo){
  // const select_change = (i)=>
  // {
  //   useEffect(() => {
  //     setLoading(true)
  //     props_demo.select_list[i] = props_demo.select_list[i]==true?false:true
      
  //   }, [])
  // }
  const col_funcs = select_col(props_demo.select_change)
  // const props_demo = table_demo()
  console.log('props_demo.select_list', props_demo.select_list)
  return (
    <div className='prose lg:prose-xl bg-amber-100'>
      <table className="table-fixed">
        <thead className='bg-sky-10'>
        {col_funcs['name_list'](props_demo.name_list, props_demo.select_list)}
        {col_funcs['cname_list'](props_demo.cname_list, props_demo.select_list)}
        {col_funcs['type_list'](props_demo.type_list, props_demo.select_list)}
        {col_funcs['select_list'](props_demo.select_list, props_demo.select_list)}
        {col_funcs['cond_list'](props_demo.cond_list, props_demo.select_list)}
        </thead>
        <tbody>
          {props_demo.record_list.map(
            col_funcs['record'](props_demo.select_list),
          )}
        </tbody>
      </table>
    </div>
    )
}




