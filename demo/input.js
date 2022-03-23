// import { useEffect, setLoading, useContext } from 'react'
import { createContext, useContext, React, useState, useCallback, useEffect } from 'react';

// import { MyContext } from '../../demo/context'; // import based on where you put it

export const InputDemoContext = createContext([[], () => {}]);
// function input_switch(){
//     // const {ctx, setCtx} = useMyContext()
//     const {ctx, setCtx} = useContext(AppContext)
//     // console.log('selected', ctx.data.selected)
//     const ctx_copy = {...ctx}
//     ctx_copy.selected = ctx_copy.selected==true?false:true
//     setCtx(ctx=>ctx_copy)
//     // ctx.data.setState({selected : ctx.data.selected==true?false:true})
//     // // data.selected = data.selected==true?false:true
//     // console.log('selected', ctx.data.selected)
//     // return 
// }

export function Input(){
    // let {ctx} = useContext(AppContext)

    const [ctx, setCtx] = useContext(InputDemoContext)
    let change_select = ()=>{
        console.log(ctx)
        ctx.selected = ctx.selected==true?false:true
        // setCtx({selected:ctx.selected})
        console.log(ctx)
        const [ctx2, setCtx2] = useContext(InputDemoContext)
        console.log('ctx2', ctx2)
    }
    
    // let props = ctx.selected
    // function test_input({box_state}){
    // const box_checked = true
    // var box_checked = data.selected
    // box_checked = 
    const input_gen = (ctx)=>ctx.selected==true?(
        <input type="checkbox" onChange={change_select} defaultChecked />):(
        <input type="checkbox" onChange={change_select}/>
    )
    const p_gen = (ctx)=>ctx.selected==true?(
        <p>checked</p>):(
            <p>unchecked</p>)
    return (<div>
    {input_gen(ctx)}
    {p_gen(ctx)}
    </div>)
}

// export async function getStaticProps() {
//     // const {ctx, setCtx} = useMyContext()
//     // const {ctx, setCtx} = useContext(AppContext)
//     // setCtx(ctx=>{selected:true})
//     return {
//       props: {
//         selected:false
//       },
//     }
//   }

export const DemoContext = createContext([[], (func) => func()]);
function selects(data){
    // const [select_list, setSList] = useContext(DemoContext)
    // return [select_list, setSList]
    const [new_data, setData] = useState(data)
    setData({new_data:[true, true, true]})
    return [new_data, setData]
}
function Demo(data) {
    // const [select_list, setSList] = useState([true,true,true])
    const [select_list, setSList] = selects([true, true, true])
    // const [select_list2, setSList2] = selects()
    console.log('select_list', select_list)
    // setSList((select_list)=>[true, true, false])
    // setSList([true, true, false])
    console.log('select_list', select_list)
    return <div>
        {select_list.length}
    </div>

    
    // const [select_list, setSList] = useState([true,true,true])
    // DemoContext
    
    const increment = (i)=> useCallback(() => {
        const [select_list, setSList] = selects()
        console.log(select_list)
        select_list[i] = select_list[i]==true?false:true
        console.log(select_list)
        setSList((select_list) => select_list)

    }, [setSList])    
    // const increment = (i)=> () => {
    //     console.log(select_list)
    //     select_list[i] = select_list[i]==true?false:true
    //     console.log(select_list)
    //     // setSList((raw_select_list) => select_list)
    // }
    // useEffect(()=>{
    //     const r = setInterval(() => {
    //     // increment()
    //     setSList((raw_select_list) => select_list)
    //     console.log('use effect:', select_list)
    //     }, 1000)

    //     return () => {
    //     clearInterval(r)
    //     }
    // }
    // , [setSList])

    return <div>
        <p>hello</p>
        <p>{select_list.length}</p>
        {select_list.map(
        (select, index)=> (
            <div key={index+20}>
                <p key={index+10}>{select_list[index]==true?"yes":"no"}</p>
                <input key={index} type='checkbox' onChange={increment(index)} />
            </div>
            // ):(
            // <div key={index+20}>
            //     <p key={index+10}>{select==true?yes:no}</p>
            //     <input key={index} type='checkbox' onChange={increment(index)}/>
            // </div>)
        ))}
        </div>
        // <input type='checkbox' onChange={increment}/>)
    // </div>
    
    // const router = useRouter()
    // let ctx = useMyContext()
    // const [ctx, setCtx] = useContext(InputDemoContext)
    // console.log('ctx', ctx)
    // // setCtx(()=>({selected:true}))
    // ctx.selected = true
    // const [ctx2, setCtx2] = useContext(InputDemoContext)
    // console.log('ctx2', ctx2, 'ctx', ctx)

    // if(1){
    //     return <div>
    //     {/* { process.browser && <Table_records {...data}></Table_records>} */}
    //     <p>hello</p>
    //     <Input ></Input>
    //     </div> 
    // }
}
export default Demo;



