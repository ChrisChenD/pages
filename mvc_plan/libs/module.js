export function Auto_type(data){
    
    if (data.cls_type_=='NewFunctor')
        return <NewFunctor.view {...data}></NewFunctor.view>

    if (data.cls_type_=='ReadMysql')
        return <ReadMysql.view {...data}></ReadMysql.view>

    if (data.cls_type_=='SaveExcel')
        return <SaveExcel.view {...data}></SaveExcel.view>

    if (data.cls_type_=='ColAppend')
        return <ColAppend.view {...data}></ColAppend.view>

    if (data.cls_type_=='Plan_op')
        return <Plan_op.view {...data}></Plan_op.view>

    if (data.cls_type_=='Plan')
        return <Plan.view {...data}></Plan.view>

    return <p>undefined type [{data}]</p>
}

export class NewFunctor {
    constructor(data) {
        this.name = data.name
    }

    static view(data){var self = new NewFunctor(data)
        return <p key={self.idx} className={self.cls_name}>{self.name}</p>
    }
}
        

export class ReadMysql {
    constructor(data) {
        
    }

    static view(data){var self = new ReadMysql(data)
        return <p key={self.idx} className={self.cls_name}>[class: ReadMysql]</p>
    }
}
        

export class SaveExcel {
    constructor(data) {
        
    }

    static view(data){var self = new SaveExcel(data)
        return <p key={self.idx} className={self.cls_name}>[class: SaveExcel]</p>
    }
}
        

export class ColAppend {
    constructor(data) {
        
    }

    static view(data){var self = new ColAppend(data)
        return <p key={self.idx} className={self.cls_name}>[class: ColAppend]</p>
    }
}
        

export class Plan_op {
    constructor(data) {
        
    }

    static view(data){var self = new Plan_op(data)
        return <p key={self.idx} className={self.cls_name}>[class: Plan_op]</p>
    }
}
        

export class Plan {
    constructor(data) {
        this.name = data.name
        this.functor_list = data.functor_list
        this.new_functor_list = data.new_functor_list
        this.op = data.op
    }

    static view(data){var self = new Plan(data)
        return <div key={self.idx} className={self.cls_name}>
                <h1>Plan {self.name}</h1>
                {self.functor_list.map(
                    (functor, idx)=>{
                        return <p>functor</p>
                    }
                )}
                {self.new_functor_list.map(
                    (functor, idx)=>{
                        console.log('functor', functor)
                        return <NewFunctor.view {...functor} key={idx}></NewFunctor.view>
                        // return <p>functor</p>
                    }
                )}
            </div>
    }
}
        