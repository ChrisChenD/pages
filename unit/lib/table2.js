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

// const base_cookbook = {
//     'tr_key':0,
//     'tr_class':La,
//     'record':[],
//     'th':[
//         {
//             'select':(record)=>true,
//             'class':Lb,
//             'children_maker':(field, index)=><p>th - children</p>,
//             // 'key':0
//         },
//     ]
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
                    'class':TrRecord.Lb,
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
        return (
            <tr className={self.tr_class}  key={self.tr_key}>
                {self.th.map(
                    (th_cookbook)=>{
                        return self.record.map(
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
}
// function TrRecord(cookbook){
//     return (
//         <tr className={cookbook.tr_class}  key={cookbook.tr_key}>
//             {cookbook.th.map(
//                 (th_cookbook)=>{
//                     return cookbook.record.map(
//                     // cookbook.record.filter(th_cookbook.select).map(
//                         (field, index)=>(<th className={th_cookbook.class} key={index}>
//                             {th_cookbook.children_maker(field, index)}
//                             {/* <p>xx</p> */}
//                             </th>
//                             )
//                     )
//                 }
//             )}
//         </tr>)
// }


export class Table {
    constructor(data) {
        this.name = data.name//string
        this.name_ext = data.name_ext
        this.fields = data.fields
        // // this.fields_ext = data.fields_ext// cn
        // // this.fields_type = data.fields_type
        // // cols = "Field,Type,Collation,Null,Key
        // // ,Default,Extra,Privileges,Comment".split(',')
    }
    static html(data){var self = new Table(data)
        console.log('Table.data', data)
        return <tbody className='bg-sky-101' key='table_info1'>
            {TrRecord.html({
                'tr_key':0,
                'tr_class':TrRecord.La,
                'record':['R1', 'R2'],
                'th':[
                    {
                        'select':(record)=>true,
                        'class':TrRecord.Lb,
                        'children_maker':(field, index)=><p>th - children [field {field}]</p>,
                    },
                ],
                'opened':true
                // 'opened':false
            })}
        </tbody>
    }
}


