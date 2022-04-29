import {Plan} from './base_module'
import {Button} from '../../../pages/unit/lib/button'
import {Parser} from './compo'

// Plan2
// export class Plan2_view extends Plan2{
//     static html(data){var self = new Plan2_view(data);return self.view(self);}
//     view (){ return <p>Plan2.view</p> }
//     // view (){ return <p>Plan2.view</p> }
// }

export function Functor_new_view(data){return Parser(data.data)}
export function Functor_view(data){return (<div><p>Functor_view</p></div>)}
export function Plan_op_view(data){return Parser(data.data)}
// (<div key='functor'>
// {Button.biu({
//     'button_name':"CODE_GENERATE",
//     'reload_page':self.reload_page, 
//     'data':{
//         'method':"make_code", 
//     },
// })}
// {Button.biu({
//     'button_name':"保存plan",
//     'reload_page':self.reload_page,
//     'data':{
//         'method':"save_plan",
//     },
// })}
// {Button.biu({
//     'button_name':"读取plan",
//     'reload_page':self.reload_page,
//     'data':{
//         'method':"load_plan",
//     },
// })}

// <p>:推送代码到git</p>
// <p>:运行命令</p>
// </div>


export function Plan2_view(data){
    var self = new Plan(data);
    // this.name = data.name//string
    // this.functor_list = data.functor_list//[string...]
    // this.new_functor_list = data.new_functor_list//string
    // this.op = data.op// [{name=string,fields=[string...]},...]
    // this.auto_code = data.auto_code
    // this.reload_page = data.reload_page
    return (<div key="plan-div">
    <h1>Plan {self.name}</h1>
    {self.functor_list.map(
        (functor, idx)=>{
            functor.reload_page = self.reload_page
            functor.idx = idx
            return <Functor_view key={`functor-html-${idx}`} 
                {...functor}></Functor_view>
        }
    )}
    {self.new_functor_list.map(
        (new_functor, idx)=>{
            new_functor.reload_page = self.reload_page
            return (
                <Functor_new_view key={`functor-new-html-${idx}`} 
                    {...new_functor}></Functor_new_view>
            )
        }
        // <Functor_new.html key='functor-new-html' {...new_functor}></Functor_new.html>
    )}
    <Plan_op_view key='op-html' {...self.op}></Plan_op_view>
    <div key='auto_code'>
        <textarea 
            // className="w-96 h-auto"
            rows="40" cols="80"
            defaultValue={self.auto_code}>
            </textarea>
    </div>
</div>)
}



// // Functor
// class Functor {
//     constructor(data) {
        
//     }
    
//     backend_access(){return [{'class': 'Plan2', 'params': ['functor_id'], 'is_router': True}]}
    
//     static html(data){var self = new Functor(data);return self.view();}
//     view (){ return <p>Functor</p> }
// }

// // MysqlFunctor
// class MysqlFunctor {
//     constructor(data) {
        
//     }
    
//     backend_access(){return [{'class': 'Plan2', 'params': ['functor_id'], 'is_router': True}]}
    
//     select_switch(field_id){
//         return this.backend_access+[
//             {'field_id':field_id}
//         ]
//     }
        
//     static html(data){var self = new MysqlFunctor(data);return self.view();}
//     view (){ return <p>MysqlFunctor</p> }
// }

// // readMysql
// class readMysql {
//     constructor(data) {
        
//     }
    
//     backend_access(){return [{'class': 'Plan2', 'params': ['functor_id'], 'is_router': True}]}
    
//     select_switch(field_id){
//         return this.backend_access+[
//             {'field_id':field_id}
//         ]
//     }
        
//     static html(data){var self = new readMysql(data);return self.view();}
//     view (){ return <p>readMysql</p> }
// }
