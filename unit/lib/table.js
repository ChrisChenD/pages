import {data_fetch} from '../../../pages/demo/DataFetch'

const La = 'border-3 border-stone-600 bg-sky-200'
const Lb = 'border-2 border-stone-100'
const Ra = 'border-3 border-stone-600 bg-stone-400'
const Rb = 'border-2 border-stone-100 bg-stone-400'

const base_cookbook = {
    'tr_key':0,
    'tr_class':La,
    'record':[],
    'th':[
        {
            'select':(record)=>true,
            'class':Lb,
            'children_maker':(field, index)=><p>th - children</p>,
            // 'key':0
        },
    ]
}
function TrRecord(cookbook){
    
    return (
        <tr className={cookbook.tr_class}  key={cookbook.tr_key}>
            {cookbook.th.map(
                (th_cookbook)=>{
                    return cookbook.record.map(
                    // cookbook.record.filter(th_cookbook.select).map(
                        (field, index)=>(<th className={th_cookbook.class} key={index}>
                            {th_cookbook.children_maker(field, index)}
                            {/* <p>xx</p> */}
                            </th>
                            )
                    )
                }
            )}
        </tr>)
}


class Table {
    constructor(table) {
      this.table = table;
    }
    // Getter
    get t_info(){return this.table.info.table_info[0]}
    get field_info_list(){
        return this.table.info.field_list}

    info() {
        if (!this.table) return <p>table is null</p>
        if (!this.table.info) return <tbody><tr><th><p>info is null</p></th></tr></tbody>
        console.log('this.t_info', this.t_info)
        return (
        <div key='d_info'>
        {/* <p>hello!!</p> */}
        <h1>db_table_name [{this.table.db_table_name}]</h1>
        <p>{this.t_info.table_schema}/{this.t_info.table_name} - {this.t_info.table_comment}</p>
    </div>)
    }
    field_info(){
        if (!this.table) return <p>table is null</p>
        if (!this.table.info) return <tbody><tr><th><p>info is null</p></th></tr></tbody>
        var cookbook = data_fetch.clone(base_cookbook)
        var get_field_attrs = [
            (obj)=>obj.Field,
            (obj)=>obj.Comment,
            (obj)=>obj.Type,
            (obj)=>obj.Key,
            
        ]
        cookbook.record = this.field_info_list
        return <tbody className='bg-sky-101' key='t_body'>
            {get_field_attrs.map(
                (get_field, field_attr_index)=>{
                    var tr_cookbook = data_fetch.clone(cookbook)
                    tr_cookbook.th[0].children_maker = (field_info)=>(
                        <p>{get_field(field_info)}</p>
                    )
                    tr_cookbook.tr_key = field_attr_index
                    return <TrRecord {...tr_cookbook} key={`trRecord-${tr_cookbook.tr_key}`}></TrRecord>
                })
            }
        </tbody>
        // )
    }
}

export function Table_info(data){
    var table = new Table(data)

    return (<div key='Table_info-div'>
        {/* <p>table</p> */}
        {table.info()}
        <table className="table-fixed bg-sky-500" key='table'>
        {/* <thead className='bg-sky-10' key='thead1'> */}
            {/* <tbody className='bg-sky-101' key='t_body'> */}
            {table.field_info()}
            {/* </tbody> */}
        </table>
        {/* <p>table end</p> */}
    </div>)
}

export default Table_info;

