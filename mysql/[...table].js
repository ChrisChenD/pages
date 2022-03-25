
import { useRouter } from 'next/router';
import { useEffect, setLoading } from 'react'
import {Table_records} from "../component_utils/component"

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
export async function getServerSideProps(context) {
    const {table} = context.query
    if (table.length == 1)
    {
      const db_name = table[0]
      const data = await (
        await fetch('http://127.0.0.1:5000/mysql/'+db_name, {})
      ).json()
      // const data = fetch_json('http://127.0.0.1:5000/'+db_name)
      return {
        props:{
          'method':'list_table',
          // 'data':fetch_json('http://127.0.0.1:5000/'+db_name)
          'data':data
        }
      }
    }
    if (table.length == 2)
    {
      const db_name = table[0]
      const tb_name = table[1]
    //   const data = await (
    //     await fetch('http://127.0.0.1:5000/mysql/'+db_name+'/'+tb_name, {})
    //   ).json()    
        const data = table_demo()

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
  
  function Table({method, data}) {
    // In your component body
    const router = useRouter()
    // call this method whenever you want to refresh server-side props
    // const refreshData = () => router.replace(router.asPath);
    
    data.select_change = (i)=>{
        // const select_change = (i)=>
        // alert('hello')
        data.select_list[i] = data.select_list[i]==true?false:true
        console.log('data.select_list', data.select_list)
        console.log('fresh page')
        console.log('router.asPath', router.asPath)
        // window.location.reload();
        // useEffect(() => {
        data.url = router.asPath
        // router.replace(data.url, {swallow:false})
        router.replace(data.url)
        //     console.log('fresh page')
        // }, [])
        // const [select_list] = useState()
        // refreshData()
        // useEffect(() => {
        //     // setLoading(true)
        //     // props_demo.select_list[i] = props_demo.select_list[i]==true?false:true
        //     router.replace(router.asPath)
        //     console.log('fresh page')
        // }, [])
        // useEffect(
        //     router.replace(router.asPath)
        // )
    }

    if (method=='list_table'){
      return list_table(data)
    }

    if (method=='table_info'){
    //   return table_info(data)
        // return Table_records(data)
        return <div>
          {/* { process.browser && <Table_records {...data}></Table_records>} */}
          <test_input></test_input>
          <Table_records {...data}></Table_records>
          </div> 
    }
    // return <div>
    //   <p>flask: ret</p>
    //   {/* <p>text: [{data}]</p> */}
    //   <p>data.print: [{data.print.join('/')}]({typeof(data.print)}){data.print.length}</p>
    // </div>
  }
  export default Table;
  
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
  function list_table(data){
    return <div>
      <p>tables: </p>
      {/* {data.map((name)=>
        <p>[{name}]</p>
      )} */}
      {/* <p>cname {data.cname}</p> */}
      {/* <p> {data.name}</p> */}
  <section>
    <header class="bg-black space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
      <div class="flex items-center justify-between">
        <h2 class="font-semibold text-slate-50">Tables</h2>
        <a href="/new" class="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
          <svg width="20" height="20" fill="currentColor" class="mr-2" aria-hidden="true">
            <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
          </svg>
          New
        </a>
      </div>
      <form class="group relative">
        <svg width="20" height="20" fill="currentColor" class="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
        </svg>
        <input class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter projects" placeholder="Filter projects...">
        </input>
      </form>
    </header>
    <ul class="bg-slate-800 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 text-sm leading-6">
      {data.map((name)=>
      <li >
        <a class="bg-stone-700 hover:bg-slate-600 hover:ring-blue-500 hover:shadow-md group rounded-md p-3 bg-white ring-1 ring-slate-200 shadow-sm">
          <dl class="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
            <div>
              {/* <dt class="sr-only">Title</dt> */}
              <dd class="group-hover:text-red-200 font-semibold text-white">
                {name}
              </dd>
            </div>
            <div>
              <dt class="sr-only">Category</dt>
              <dd class="group-hover:text-red-200 text-white">table_name</dd>
            </div>
          </dl>
        </a>
      </li>
      )}
      {/* <a :href="project.url" class="hover:bg-blue-500 hover:ring-blue-500 hover:shadow-md group rounded-md p-3 bg-white ring-1 ring-slate-200 shadow-sm"> */}
      <li class="flex">
        <a href="/new" class="hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3">
          <svg class="group-hover:text-blue-500 mb-1 text-slate-400" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
          </svg>
          New project
        </a>
      </li>
    </ul>
  </section>
    </div>
  }
  