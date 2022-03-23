// import { useEffect, setLoading, useContext } from 'react'
import { createContext, useContext, React, useState, useCallback, useEffect } from 'react';

// import { MyContext } from '../../demo/context'; // import based on where you put it

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
   
}

function myState(data){
    const [value, setValue] = useState(data)
    return [value, setValue]
}
function ClickCount() {
    const [counts, setCount] = myState([0,0])
    const increment = (i)=>useCallback(() => {
        console.log('counts', counts, i)
        setCount((v_list)=> [...v_list, i])
        console.log('counts', counts, i)
    }, [setCount])
  
    return (<div>
        {counts.map((i)=>
            <div key={i+20}>
                <button key={i} onClick={increment(i)}>Clicks: {counts[i]}</button>
                <p key={i+10}>{i}</p>
            </div>
        )}
        </div>)
  }


export default ClickCount;



