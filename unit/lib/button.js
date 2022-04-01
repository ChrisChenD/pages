import {data_fetch} from '../../../pages/demo/DataFetch'

export class Button {
    constructor(data) {
        console.log('init data:', data)
        this.button_name = data.button_name//string
        this.data = data.data//[string...]
        this.reload_page = data.reload_page//string
        this.modify_data = data.modify_data// [{name=string,fields=[string...]},...]
        this.input_id = ""
        if (data.input_id) this.input_id = data.input_id
    }
    static push(data){var self = new Button(data)
        
        return <button className="bg-stone-700 border-4 text-white" onClick={self.reload_page(
            ()=>{
                var new_data = data_fetch.clone(self.data)
                var new_data = self.modify_data(new_data)
                // console.log('reload_page: module', new_module)
                return new_data
            }
        )}> @{self.button_name}@ </button>
    }
    static push_text(data){var self = new Button(data)
        var button_id = `button-${self.input_id}`
        return (<div key='Button-group' className='bg-sky-200'>
            <p>{self.input_id}</p>
            <input id={self.input_id} 
                placeholder="input here..."
                onKeyUp={(event)=>{
                    if (event.key === 'Enter') {
                        // Cancel the default action, if needed
                        event.preventDefault();
                        // Trigger the button element with a click
                        document.getElementById(button_id).click();
                    }
                }}
                />
            <button className="bg-stone-700 border-4 text-white" onClick={self.reload_page(
                ()=>{
                    var new_data = data_fetch.clone(self.data)
                    var value = document.getElementById(self.input_id).value
                    var new_data = self.modify_data(new_data, value)
                    // console.log('reload_page: module', new_module)
                    return new_data
                }
            )} id={button_id}> @{self.button_name}@ </button>
            
        </div>
        )
    }
}
