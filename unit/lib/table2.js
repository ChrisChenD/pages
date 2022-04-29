// class Table {
//     constructor(data) {
//       this.table = table;
//     }
//     // Getter
//     get t_info(){return this.table.info.table_info[0]}
//     get field_info_list(){
//         return this.table.info.field_list
//     }
// }
import {data_fetch} from '../../../pages/demo/DataFetch'
import {Button} from "./button"

// class TrRecord{
//     static La = 'border-3 border-stone-600 bg-sky-200'
//     static Lb = 'border-2 border-stone-100'
//     static Ra = 'border-3 border-stone-600 bg-stone-400'
//     static Rb = 'border-2 border-stone-100 bg-stone-400'
//     constructor(data) {
//         this.tr_key = data.tr_key//string
//         this.tr_class = data.tr_class
//         this.record = data.record
//         this.th = data.th
//         this.opened = data.opened
//     }
//     demo(){
//         return TrRecord.html({
//             'tr_key':0,
//             'tr_class':TrRecord.La,
//             'record':[],
//             'th':[
//                 {
//                     'select':(record)=>true,
//                     'class':TrRecord.Lb,
//                     'children_maker':(field, index)=><p>th - children</p>,
//                 },
//             ],
//             'opened':true
//         })
//     }
//     static html(data){var self = new TrRecord(data)
//         if (!data.opened)
//         {
//             return <p>NOT OPENED TRRECORD</p>
//         }
//         // return <p>debug</p>
        
//         return (
//             <tr className={self.tr_class}  key={self.tr_key}>
//                 {self.th.map(
//                     (th_cookbook)=>{
//                         return self.record.map(
//                         // cookbook.record.filter(th_cookbook.select).map(
//                             (field, index)=>(<th className={th_cookbook.class} key={index}>
//                                 {th_cookbook.children_maker?th_cookbook.children_maker(field, index):<p>[no children_maker]</p>}
//                                 {/* <p>xx</p> */}
//                                 </th>
//                             )
//                         )
//                     }
//                 )}
//             </tr>)
//     }
// }
class TrRecord{
    static La = 'border-3 border-stone-600 bg-sky-200'
    static Lb = 'border-2 border-stone-100'
    static Ra = 'border-3 border-stone-600 bg-stone-400'
    static Rb = 'border-2 border-stone-100 bg-stone-400'
    constructor(data) {
        this.tr_key = data.tr_key//string
        this.tr_class = data.tr_class
        this.record = data.record
        this.th = data.th
        this.opened = data.opened
    }
    demo(){
        return TrRecord.html({
            'tr_key':0,
            'tr_class':TrRecord.La,
            'record':[],
            'th':[
                {
                    'select':(record)=>true,
                    'class':(field, index)=>TrRecord.Lb,
                    'children_maker':(field, index)=><p>th - children</p>,
                },
            ],
            'opened':true
        })
    }
    static html(data){var self = new TrRecord(data)
        if (!data.opened)
        {
            return <p>NOT OPENED TRRECORD</p>
        }
        // return <p>debug</p>
        
        return (
            <tr className={self.tr_class}  key={self.tr_key}>
                {self.th.map(
                    (th_cookbook)=>{
                        return self.record.map(
                        // cookbook.record.filter(th_cookbook.select).map(
                            (field, index)=>(<th className={th_cookbook.class(field, index)} key={index}>
                                {th_cookbook.children_maker?th_cookbook.children_maker(field, index):<p>[no children_maker]</p>}
                                {/* <p>xx</p> */}
                                </th>
                            )
                        )
                    }
                )}
            </tr>)
    }
}



export class Table {
    constructor(data) {
        this.reload_page = data.reload_page
        if (data.table_info){
            this.table_name = data.table_info.table_name
            this.table_comment = data.table_info.table_comment
        }
        this.field_list = data.field_list
        this.comment_list = data.comment_list
    }
    get_base_param(){
        return {
            'tr_key':0,
            'tr_class':TrRecord.La,
            'record':self.field_list,
            'th':[
                {
                    'select':(record)=>true,
                    'class':(field, index)=>field.selected?TrRecord.Lb:TrRecord.Rb,
                    'children_maker':(field, index)=><p>[{field.value}]</p>,
                },
            ],
            'opened':true
        }
    }
    get_param(record, maker){
        var param = this.get_base_param()
        param.record = record
        param.th[0].children_maker = maker
        return param
        
    }
    get_field_param(){
        return this.get_param(this.field_list,
            (field, index)=><p>[{field.value}]</p>
            )
        // var field_param = this.get_base_param()
        // field_param.record = ['field_list'].concat(this.field_list)
        // field_param.th[0].children_maker = (field, index)=><p>[{field}]</p>
        // return field_param
    }
    get_comment_param(){
        return this.get_param(this.comment_list,
            (field, index)=><p>[{field.value}]</p>
            )
        // var comment_param = this.get_base_param()
        // comment_param.record = ['comment_list'].concat(this.comment_list)
        // comment_param.th[0].children_maker = (field, index)=><p>[{field}]</p>
        // return comment_param
    }
    
    static html(data){var self = new Table(data)
        // reload_page
        var field_param = self.get_field_param()
        var comment_param = self.get_comment_param()
        if (!(self.table_name && self.field_list))
            return <p>data isLoading</p>
        return <div key='table'>
            <h1 className='bg-sky-101'>[{self.table_comment}]{self.table_name}</h1>
            <table className="table-fixed bg-sky-500" key='table'>
                <thead>
                </thead>
                <tbody className='bg-sky-101' key='table_info1'>
                    {<TrRecord.html {...field_param}></TrRecord.html>}
                    {<TrRecord.html {...comment_param}></TrRecord.html>}
                    {/* {TrRecord.html(comment_param)} */}
                </tbody>
            </table>
        </div>
    }
    
}
export class Table_ext extends Table{
    constructor(data){
        super(data)
        this.cond_list = data.cond_list
        this.select_list = data.select_list
        this.reload_page = data.reload_page
        this.idx = data.idx
    }
    select_switch_list(){
        return []
    }
    // get_field_param(){ return super.get_field_param()}
    // get_comment_param(){ return super.get_comment_param()}
    get_select_param(){
        // var select_list = this.get_base_param()
        // select_list.record = ['select_list'].concat(this.select_list)
        // select_list.th[0].children_maker = 
        var maker = (field, index)=>{
            var button_name = field.value?"+":"-"
            if (index==0) button_name = field.value
            return <div key="select-param">
                {/* <p></p> */}
                {Button.push({
                    'data':"", 
                    'reload_page':this.reload_page,
                    'modify_data':(data)=>{
                        return {
                            'method':'functor_select_switch',
                            'functor_id':this.idx,
                            'field_id':index,
                        }
                    }, 
                    'button_name':button_name,
                })}
            </div>
        }
        return this.get_param(this.select_list,
            maker
            )

        // return select_list
    }
    get_cond_param(){
        
        return this.get_param(this.cond_list,
            (field, index)=>{
                var input_id = `functor-${this.idx}-field_id-${index}`
                // 
                console.log('input_id', input_id)
                return <input 
                    id={input_id}
                    defaultValue={field.value}
                    onKeyUp={(event)=>{
                        if (event.key === 'Enter') {
                            event.preventDefault();
                            console.log('input_id', input_id)
                            var cond = document.getElementById(input_id).value;
                            this.reload_page((data)=>data)({
                                'method':'functor_modify_cond',
                                'functor_id':this.idx,
                                'field_id':index,
                                'cond':cond
                            })
                        }
                    }}
                />

            }
            )
        // var cond_param = this.get_base_param()
        // cond_param.record = ['cond_list'].concat(this.cond_list)
        // cond_param.th[0].children_maker = (field, index)=><p>[{field}]</p>
        // return cond_param
    }

    static html(data){var self = new Table_ext(data)
        // reload_page
        var field_param = self.get_field_param()
        var comment_param = self.get_comment_param()
        var select_param = self.get_select_param()
        var cond_param = self.get_cond_param()
        console.log('data', data)
        console.log('comment_param', comment_param)
        console.log('select', select_param)
        if (!(self.table_name && self.field_list))
            return <p>data isLoading</p>
        return <div key='table'>
            <h1 className='bg-sky-101'>[{self.table_comment}]{self.table_name}</h1>
            <table className="table-fixed bg-sky-500" key='table'>
                <thead>
                </thead>
                <tbody className='bg-sky-101' key='table_info1'>
                    {<TrRecord.html {...comment_param}></TrRecord.html>}
                    {<TrRecord.html {...field_param}></TrRecord.html>}
                    {<TrRecord.html {...select_param}></TrRecord.html>}
                    {<TrRecord.html {...cond_param}></TrRecord.html>}
                    {/* {TrRecord.html(comment_param)} */}
                </tbody>
            </table>
        </div>
    }
}
export class Table_ext2 extends Table_ext{
    constructor(data){
        super(data)
        this.key_list = data.key_list
        this.prev_list = data.prev_list
    }
    get_key_param(){
        var maker = (field, index)=>{
            var button_name = field.value
            // if (index==0) button_name = field.value
            return <div key="select-param">
                {/* <p></p> */}
                {Button.push({
                    'data':"", 
                    'reload_page':this.reload_page,
                    'modify_data':(data)=>{
                        // def select_key(self, field_id):
                        return {
                            'method':'functor_select_key',
                            'functor_id':this.idx,
                            'field_id':index,
                        }
                    },
                    'button_name':button_name,
                })}
            </div>
        }
        return this.get_param(this.key_list,
            maker
        )
    }
    get_prev_list_param(){
        console.log('this.prev_list', this.prev_list)
        var maker = (field, index)=>{
            var button_name = field.value
            // if (index==0) button_name = field.value
            return <div key="select-param">
                {/* <p></p> */}
                {Button.push({
                    'data':"", 
                    'reload_page':this.reload_page,
                    'modify_data':(data)=>{
                        // def select_key(self, field_id):
                        return {
                            'method':'functor_select_chunk_key',
                            'functor_id':this.idx,
                            'field_id':index,
                        }
                    },
                    'button_name':button_name,
                })}
            </div>
        }
        return this.get_param(this.prev_list,
            maker
        )
    }
    // get_key_param(){
    //     return this.get_param(this.key_list,
    //         (field, index)=>{
    //             var input_id = `functor-${this.idx}-field_id-${index}`
    //             // 
    //             console.log('input_id', input_id)
    //             return <input 
    //                 id={input_id}
    //                 defaultValue={field.value}
    //                 onKeyUp={(event)=>{
    //                     if (event.key === 'Enter') {
    //                         event.preventDefault();
    //                         console.log('input_id', input_id)
    //                         var cond = document.getElementById(input_id).value;
    //                         this.reload_page((data)=>data)({
    //                             'method':'functor_modify_cond',
    //                             'functor_id':this.idx,
    //                             'field_id':index,
    //                             'cond':cond
    //                         })
    //                     }
    //                 }}
    //             />
    //         }
    //         )
    // }
    static html(data){var self = new Table_ext2(data)
        // reload_page
        var field_param = self.get_field_param()
        var comment_param = self.get_comment_param()
        var select_param = self.get_select_param()
        var cond_param = self.get_cond_param()
        var key_param = self.get_key_param()
        var prev_list_param = self.get_prev_list_param()
        console.log('prev_list_param', prev_list_param)
        console.log('data', data)
        // console.log('comment_param', comment_param)
        // console.log('select', select_param)
        if (!(self.table_name && self.field_list))
            return <p>data isLoading</p>
        return <div key='table'>
            <h1>TABLE_EXT2</h1>
            <h1 className='bg-sky-101'>[{self.table_comment}]{self.table_name}</h1>
            <table className="table-fixed bg-sky-500" key='table'>
                <thead>
                </thead>
                <tbody className='bg-sky-101' key='table_info1'>
                    {<TrRecord.html {...comment_param}></TrRecord.html>}
                    {<TrRecord.html {...field_param}></TrRecord.html>}
                    {<TrRecord.html {...select_param}></TrRecord.html>}
                    {<TrRecord.html {...cond_param}></TrRecord.html>}
                    {<TrRecord.html {...key_param}></TrRecord.html>}
                    {<TrRecord.html {...prev_list_param}></TrRecord.html>}
                    
                    {/* {TrRecord.html(comment_param)} */}
                </tbody>
            </table>
        </div>
    }
}
