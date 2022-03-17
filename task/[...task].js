
import {Table_records, Note} from "../../components/compose"
export async function getServerSideProps(context) {
    const {task} = context.query
    if (task.length == 1)
    {
      const task_name = task[0]
      const data = await (
        await fetch('http://127.0.0.1:5000/task/'+task_name, {})
      ).json()    
      // const data = fetch_json('http://127.0.0.1:5000/'+db_name)
      return {
        props:{
          'method':'get_task',
          // 'data':fetch_json('http://127.0.0.1:5000/'+db_name)
          'data':data
        }
      }
    }
    if (task.length == 2)
    {
      const db_name = task[0]
      const tb_name = task[1]
      const data = await (
        await fetch('http://127.0.0.1:5000/mysql/'+db_name+'/'+tb_name, {})
      ).json()    
      return {
        props:{
          'method':'table_info',
          'data':data
        }
      }
    }
    return {
      props:{'data':{'print':table}}
    }
  }
  
  function Task({method, data}) {
    if (method=='get_task'){
      return get_task(data)
    }
    if (method=='table_info'){
      return table_info(data)
    }
    // return <div>
    //   <p>flask: ret</p>
    //   {/* <p>text: [{data}]</p> */}
    //   <p>data.print: [{data.print.join('/')}]({typeof(data.print)}){data.print.length}</p>
    // </div>
  }
  export default Task;
  
  function table_info(data){
    return <div >
      <h3 class="bg-black font-semibold text-slate-50 h-30">table {data.tb_name}</h3>
      <p>cname {data.tb_cname} ...</p>
      <p>len {data.cols.length}</p>
      {[
        (obj)=><li class='text-slate-50 w-32'>{obj.name}</li>, 
        (obj)=><li class='text-slate-50 w-32'>{obj.cname}</li>, 
        (obj)=><li class='text-slate-50 w-32 round'>{obj.type}</li>
        // ,(obj)=><li class='text-slate-50 w-32 round'>{obj.type}</li>
        ,(obj)=>(<input type="checkbox" class="text-slate-50 w-32"/>)
        ,(obj)=>(<li><input class="text-black w-32" placeholder="query cond.."/></li>)
        //placeholder="Search for anything..."
        // (obj)=><li class='text-slate-400'>{functor(obj)}</li>, 
        // (obj)=>{obj.type}
      ].map((functor)=>(
        <div class='flex flex-row pr-5 pt-2'>
        {data.cols.map((obj)=>(
          <div class='box-border bg-blue-300 w-32 border-0.5'>
            <ol>
              {functor(obj)}
            </ol>
          </div>
        ))}
      </div>
      ))}
        
      {/* <p>{typeof(data.cols[0])}..{data.cols[0].name}</p> */}
  
      {/* {data.cols.map((obj)=>{
        <p>{obj.name}[{obj.cname}].{obj.type}.</p>
      })} */}
      {/* <p> {data.name}</p> */}
    </div>
  }
function get_task(data){
    // {'task_name': 't1', 'desc': '', 'src_dict': {}, 'output': ''}
    return (<div>
      <h2> task </h2>
      <p> {data.task_name} </p>
      <h2> task describe </h2>
      <li><input class="text-black w-32" placeholder={data.desc}/></li>
      
      <h2> task source {typeof(data.src_dict)}</h2>
      {Object.keys(data.src_dict).map(
        (name)=><p>{name}</p>
      )}
      {/* {data.src_dict.map((src)=>
        <p> {src} </p>
      )}  */}
      <h2> output </h2>
      <p> {data.output} </p>
      <Table_records></Table_records>
      {/* <Note></Note> */}
    </div>)
  }
