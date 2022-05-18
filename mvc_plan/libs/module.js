export function Auto_type(data){
    
    if (data.cls_type_=='Com_List')
        return <Com_List {...data} ></Com_List>

    if (data.cls_type_=='Com_Line')
        return <Com_Line {...data} ></Com_Line>

    if (data.cls_type_=='Com_Table')
        return <Com_Table {...data} ></Com_Table>

    if (data.cls_type_=='Com_P')
        return <Com_P {...data} ></Com_P>

    if (data.cls_type_=='Com_Button')
        return <Com_Button {...data} ></Com_Button>

    if (data.cls_type_=='Com_text')
        return <Com_text {...data} ></Com_text>

    if (data.cls_type_=='Com_textarea')
        return <Com_textarea {...data} ></Com_textarea>

    if (data.cls_type_=='ReadMysqlDb_Table')
        return <ReadMysqlDb_Table.view {...data} ></ReadMysqlDb_Table.view>

    if (data.cls_type_=='Table2')
        return <Table2.view {...data} ></Table2.view>

    if (data.cls_type_=='ReadMysqlDb')
        return <ReadMysqlDb.view {...data} ></ReadMysqlDb.view>

    if (data.cls_type_=='SaveExcel')
        return <SaveExcel.view {...data} ></SaveExcel.view>

    if (data.cls_type_=='ColAppend')
        return <ColAppend.view {...data} ></ColAppend.view>

    if (data.cls_type_=='NewFunctor')
        return <NewFunctor.view {...data} ></NewFunctor.view>

    if (data.cls_type_=='Plan_op')
        return <Plan_op.view {...data} ></Plan_op.view>

    if (data.cls_type_=='Plan_functors')
        return <Plan_functors.view {...data} ></Plan_functors.view>

    if (data.cls_type_=='Plan_new_functors')
        return <Plan_new_functors.view {...data} ></Plan_new_functors.view>

    if (data.cls_type_=='Plan')
        return <Plan.view {...data} ></Plan.view>

    console.log('Error!: undifined type:', data)
    return <p>undefined type [{data}]</p>
}
function Com_List(self){
    return <div key={self.idx} className={self.cls_name}>
        {self.e_list.map(
            (e, idx)=> {
                e.call = self.call
                return <Auto_type {...e} key={idx}/>
            }
        )}
    </div>
}
function Com_Line(self){
    return <div className='flex {self.cls_name}' key={self.idx}>
        {self.e_list.map(
            (e, idx)=> {
                e.call = self.call
                return <Auto_type {...e} key={idx}/>
            }
        )}
    </div>
}
function Com_Table(self){
    return <table 
    className="table-fixed bg-sky-100" key={self.idx}>
        <thead>
        </thead>
        <tbody className='bg-stone-100' key='table_info1'>
            {self.e_list.map(
                (line, line_idx) => <tr key={line_idx}>
                    {line.map(
                        (e, e_idx)=>{
                            e.call = self.call
                            return <th key={e_idx}>
                                <Auto_type {...e} key={e_idx}/>

                            </th >
                        }
                    )}
                </tr>
            )}
        </tbody>
    </table>
}
function Com_P(self){
    return <p key={self.idx} className={self.cls_name}>{self.value}</p>
}
function Com_Button(self){
    return <button key={self.idx} className={self.cls_name} onClick={
        self.call({
            "idx":self.idx,
            "method":"onClick",
            "params":[]
        })
    }>{self.value}</button>
}
function Com_text(self){
    const onkeyup_action = (event) => {
        if(event.key=='Enter'){
            event.preventDefault()
            const text = document.getElementById(self.idx).value;
            self.call({
                "idx":self.idx,
                "method":"onEnter",
                "params":[text, ]
            })()
        }
    }
    return <input key={self.idx} className={self.cls_name}
        id={self.idx}
        placeholder={self.text}
        onKeyUp={onkeyup_action}
    />
}
function Com_textarea(self){
    const onkeyup_action = (event) => {
        if(event.key=='Enter'){
            event.preventDefault()
            const text = document.getElementById(self.idx).value;
            self.call({
                "idx":self.idx,
                "method":"onEnter",
                "params":[text, ]
            })()
        }
    }
    return <textarea key={self.idx} className={self.cls_name}
            id={self.idx}
            rows={self.rown} cols={self.coln}
            defaultValue={self.text}
            />
}

export class ReadMysqlDb_Table {
    constructor(data) {
        this.idx = data.idx
        this.cls_name = data.cls_name
        this.cls_type_ = data.cls_type_
        this.db_chain = data.db_chain
        this.db_chain_note = data.db_chain_note
        this.com_table = data.com_table
        this.call = data.call
    }

    static view(data){var self = new ReadMysqlDb_Table(data)
        self.db_chain.call = self.call
        self.db_chain_note.call = self.call
        self.com_table.call = self.call
        return <div key={self.idx} className={self.cls_name}>
            <Com_P {...self.db_chain}></Com_P>
            <Com_P {...self.db_chain_note}></Com_P>
            <Com_Table {...self.com_table}></Com_Table>
        </div>
    }
}
        

export class Table2 {
    constructor(data) {
        this.idx = data.idx
        this.cls_name = data.cls_name
        this.cls_type_ = data.cls_type_
        this.db_chain = data.db_chain
        this.db_chain_note = data.db_chain_note
        this.com_table = data.com_table
        this.call = data.call
    }

    static view(data){var self = new Table2(data)
        self.db_chain.call = self.call
        self.db_chain_note.call = self.call
        self.com_table.call = self.call
        return <div key={self.idx} className={self.cls_name}>
            <Com_P {...self.db_chain}></Com_P>
            <Com_P {...self.db_chain_note}></Com_P>
            <Com_Table {...self.com_table}></Com_Table>
        </div>
    }
}
        

export class ReadMysqlDb {
    constructor(data) {
        this.idx = data.idx
        this.cls_name = data.cls_name
        this.cls_type_ = data.cls_type_
        this.src_info = data.src_info
        this.table = data.table
        this.call = data.call
    }

    static view(data){var self = new ReadMysqlDb(data)
        self.src_info.call = self.call
        self.table.call = self.call
        return <div key={self.idx} className={self.cls_name}>
            <Com_Line {...self.src_info}></Com_Line>
            <ReadMysqlDb_Table.view {...self.table}></ReadMysqlDb_Table.view>
        </div>
    }
}
        

export class SaveExcel {
    constructor(data) {
        this.idx = data.idx
        this.cls_name = data.cls_name
        this.cls_type_ = data.cls_type_
        this.excel_info = data.excel_info
        this.prev_fields_select = data.prev_fields_select
        this.call = data.call
    }

    static view(data){var self = new SaveExcel(data)
        self.excel_info.call = self.call
        self.prev_fields_select.call = self.call
        return <div key={self.idx} className={self.cls_name}>
            <Com_Line {...self.excel_info}></Com_Line>
            <Com_Line {...self.prev_fields_select}></Com_Line>
        </div>
    }
}
        

export class ColAppend {
    constructor(data) {
        this.idx = data.idx
        this.cls_name = data.cls_name
        this.cls_type_ = data.cls_type_
        this.src_info = data.src_info
        this.table = data.table
        this.prev_fields_select = data.prev_fields_select
        this.call = data.call
    }

    static view(data){var self = new ColAppend(data)
        self.src_info.call = self.call
        self.table.call = self.call
        self.prev_fields_select.call = self.call
        return <div key={self.idx} className={self.cls_name}>
            <Com_Line {...self.src_info}></Com_Line>
            <Table2.view {...self.table}></Table2.view>
            <Com_Line {...self.prev_fields_select}></Com_Line>
        </div>
    }
}
        

export class NewFunctor {
    constructor(data) {
        this.idx = data.idx
        this.cls_name = data.cls_name
        this.cls_type_ = data.cls_type_
        this.name = data.name
        this.call = data.call
    }

    static view(data){var self = new NewFunctor(data)
        self.name.call = self.call
        return <div key={self.idx} className={self.cls_name}>
            <Com_Button {...self.name}></Com_Button>
        </div>
    }
}
        

export class Plan_op {
    constructor(data) {
        this.idx = data.idx
        this.cls_name = data.cls_name
        this.cls_type_ = data.cls_type_
        this.region_name = data.region_name
        this.plan_op_list = data.plan_op_list
        this.code = data.code
        this.call = data.call
    }

    static view(data){var self = new Plan_op(data)
        self.region_name.call = self.call
        self.plan_op_list.call = self.call
        self.code.call = self.call
        return <div key={self.idx} className={self.cls_name}>
            <Com_P {...self.region_name}></Com_P>
            <Com_Line {...self.plan_op_list}></Com_Line>
            <Com_textarea {...self.code}></Com_textarea>
        </div>
    }
}
        

export class Plan_functors {
    constructor(data) {
        this.idx = data.idx
        this.cls_name = data.cls_name
        this.cls_type_ = data.cls_type_
        this.region_name = data.region_name
        this.functor_list = data.functor_list
        this.call = data.call
    }

    static view(data){var self = new Plan_functors(data)
        self.region_name.call = self.call
        self.functor_list.call = self.call
        return <div key={self.idx} className={self.cls_name}>
            <Com_P {...self.region_name}></Com_P>
            <Com_List {...self.functor_list}></Com_List>
        </div>
    }
}
        

export class Plan_new_functors {
    constructor(data) {
        this.idx = data.idx
        this.cls_name = data.cls_name
        this.cls_type_ = data.cls_type_
        this.region_name = data.region_name
        this.functor_list = data.functor_list
        this.call = data.call
    }

    static view(data){var self = new Plan_new_functors(data)
        self.region_name.call = self.call
        self.functor_list.call = self.call
        return <div key={self.idx} className={self.cls_name}>
            <Com_P {...self.region_name}></Com_P>
            <Com_List {...self.functor_list}></Com_List>
        </div>
    }
}
        

export class Plan {
    constructor(data) {
        this.idx = data.idx
        this.cls_name = data.cls_name
        this.cls_type_ = data.cls_type_
        this.plan_name = data.plan_name
        this.functor_list = data.functor_list
        this.new_functor_list = data.new_functor_list
        this.op = data.op
        this.call = data.call
    }

    static view(data){var self = new Plan(data)
        self.plan_name.call = self.call
        self.functor_list.call = self.call
        self.new_functor_list.call = self.call
        self.op.call = self.call
        return <div key={self.idx} className={self.cls_name}>
            <Com_P {...self.plan_name}></Com_P>
            <Plan_functors.view {...self.functor_list}></Plan_functors.view>
            <Plan_new_functors.view {...self.new_functor_list}></Plan_new_functors.view>
            <Plan_op.view {...self.op}></Plan_op.view>
        </div>
    }
}
        