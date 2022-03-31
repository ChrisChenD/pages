import {data_fetch} from '../../../pages/demo/DataFetch'

export function Button_push(attr){
    // var Button_attr = {
    //     "data":,
    //     "modify_data":,// var new_data = attr.modify_data(new_data)
    //     "button_name":,
    // }

    return <button className="bg-stone-700 border-4 text-white" onClick={attr.data.reload_page(
        ()=>{
            var new_data = data_fetch.clone(attr.data)
            var new_data = attr.modify_data(new_data)
            // console.log('reload_page: module', new_module)
            return new_data
        }
    )}> @{attr.button_name}@ </button>
}

export function Button_push_text(attr){
    console.log('attr', attr)
    // var {data, modify_data, button_name, input_id} = attr.query
    // var new_data = modify_data(new_data, value)
    return (<div key='Button-group'>
        <button className="bg-stone-700 border-4 text-white" onClick={attr.data.reload_page(
            ()=>{
                var new_data = data_fetch.clone(attr.data)
                var value = document.getElementById(attr.input_id).value
                var new_data = attr.modify_data(new_data, value)
                // console.log('reload_page: module', new_module)
                return new_data
            }
        )}> @{attr.button_name}@ </button>
        <p>{attr.input_id}</p>
        <input id={attr.input_id} placeholder="input here..."/>
    </div>
    )
}
