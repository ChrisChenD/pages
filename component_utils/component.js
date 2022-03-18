
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
  console.log('select_div', 'e_list', e_list.length)
  for(let i=0;i < e_list.length;i++){
    if (select_list[i] == true) {
      selects.push(e_list[i])
      console.log('select+')
    }
    else{
      unselects.push(e_list[i])
      console.log('unselect+')
    }
  }
  return [selects, unselects]
}
function select_col(){
  // const record_tr = ''
  const title_class_tr_selected = 'border-3 border-stone-600 bg-sky-200'
  const title_class_th_selected = 'border-2 border-stone-100'
  const title_class_tr_unselected = 'border-3 border-stone-600 bg-stone-400'
  const title_class_th_unselected = 'border-2 border-stone-100'
  
  function title_class(e_list, select_list, th_maker){
    const div = select_div(e_list, select_list)
    const selects = div[0]
    const unselects = div[1]
    // return (<tr>
    //   <p>{selects.length}|{unselects.length}</p>
    // </tr>)
    return (
      <tr class={title_class_tr_selected}>
        {selects.map(
          (e)=>(<th class={title_class_th_selected}>
              {th_maker(e, true)}
            </th>
          )
        )}
        {unselects.map(
          (e)=>(<th class={title_class_th_unselected}>
              {th_maker(e, false)}
            </th>
          )
        )}
      </tr>)
  }
  function record(field_list, select_list){
    const div = select_div(field_list, select_list)
    const selects = div[0]
    const unselects = div[1]
    return (<tr>
      {selects.map(
        (field)=>(
          <th>{field}</th>
        )
      )}
      {unselects.map(
        (field)=>(
          <th class={title_class_th_unselected}></th>
        )
      )}
    </tr>)
  }


  return {
    'name_list':(e_list, select_list)=>title_class(e_list, select_list, (name, selected)=>(name)),
    'cname_list':(e_list, select_list)=>title_class(e_list, select_list, (name, selected)=>(name)),
    'type_list':(e_list, select_list)=>title_class(e_list, select_list, (name, selected)=>(name)),
    'select_list':(e_list, select_list)=>title_class(e_list, select_list, 
      (selected_, selected)=>selected==true?(
      <input type="checkbox" checked/>):(
        <input type="checkbox"/>
      )
    ),
    'cond_list':(e_list, select_list)=>title_class(e_list, select_list,
      (cond, selected)=><input placeholder={cond}/>
    ),
    'record':(select_list)=>(
      (field_list)=>record(field_list, select_list)
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

export function Table_records(props){
  const col_funcs = select_col()
  const props_demo = table_demo()
  return (
    <div class='prose lg:prose-xl bg-amber-100'>
      <table class="table-fixed">
        <thead class='bg-sky-10'>
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




