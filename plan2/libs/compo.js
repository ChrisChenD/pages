function key_name(tag_name, index){
    return `${tag_name}->-${index}`
}

export function Parser(data, index){
    if (data.c == 'Line') return Line(data, index);
    if (data.c == 'Table') return Table(data, index);
    if (data.c == 'P') return P(data, index)
    
    console.log('compo not legal', data)
    return <p>compo not legal</p>
}
export function P(data, index){
    var cls_name = data.cls_name
    var value = data.value
    return <p className={cls_name} key={key_name('P', index)} >
        {value}
    </p>
}
// Parser(e, index)
export function Line(data, index){
    var cls_name = data.cls_name
    var fields = data.fields
    return <div className={`flex ${cls_name}`}  key={key_name('line', index)}>
        {fields.map(
            (field, index)=>(
                Parser(field, index)
            )
        )}
    </div>
}
export function TableLine(data, index){
    var cls_name = data.cls_name
    var fields = data.fields
    return <tr className={cls_name}  key={key_name('tr', index)}>
        {fields.map(
            (field, index)=>(<th className={field.line_cls_name} key={index}>
                {Parser(field, index)}
                </th>
            )
        )}
    </tr>
}

export function Table(data, index){
    var cls_name = data.cls_name
    var body = data.cls_name
    var cls_name_body = data.cls_name_body
    // return <table className="table-fixed bg-sky-500" key='table'>
    //     <thead>
    //     </thead>
    //     <tbody className='bg-sky-101' key='table_info1'>
    return <table className={cls_name} key={key_name('table', index)}>
        <thead>
            {/* {data.head.map(
                (line, index)=> Line(line, index)
            )} */}
        </thead>
        <tbody className={cls_name_body} key={key_name('tbody', index)}>
            {body.map(
                (line, index)=> TableLine(line, index)
            )}
            {/* {<TrRecord.html {...field_param}></TrRecord.html>}
            {<TrRecord.html {...comment_param}></TrRecord.html>}
            {TrRecord.html(comment_param)} */}
        </tbody>
    </table>
}

// export function List(data, index){
//     return <div key={`List->-${index}`}>
//         {data.map(
//             (e, index)=>Parser(e, index)
//         )}
//     </div>
// }

