
// New_functor
export class New_functor {
    constructor(data) {
        this.name = data.name
        this.data = data.data
    }
    
    backend_access(){return [{'class': 'Plan', 'params': ['functor_id'], 'is_router': True}]}
    
    // call backend!
    add_functor(){
        return this.backend_access()+[{
            'method':'add_functor',
            'params':{}
        }]
    }
    static html(data){var self = new New_functor(data);return self.view();}
    view (){ return <p>New_functor</p> }
}

// Plan_op
export class Plan_op {
    constructor(data) {
        this.name = data.name
        this.data = data.data
    }
    
    backend_access(){return []}
    
    static html(data){var self = new Plan_op(data);return self.view();}
    view (){ return <p>Plan_op</p> }
}

// Plan
export class Plan {
    constructor(data) {
        this.name = data.name
        this.functor_list = data.functor_list
        this.new_functor_list = data.new_functor_list
        this.op = data.op
    }
    
    backend_access(){return []}
    

    static html(data){var self = new Plan(data);return self.view();}
    view (){ return <p>Plan</p> }
}

// Functor
export class Functor {
    constructor(data) {
        
    }
    
    backend_access(){return [{'class': 'Plan', 'params': ['functor_id'], 'is_router': True}]}
    
    static html(data){var self = new Functor(data);return self.view();}
    view (){ return <p>Functor</p> }
}

// MysqlFunctor
export class MysqlFunctor {
    constructor(data) {
        
    }
    
    backend_access(){return [{'class': 'Plan', 'params': ['functor_id'], 'is_router': True}]}
    
    // call backend!
    modify_cond(field_id, cond){
        return this.backend_access()+[{
            'method':'modify_cond',
            'params':{'field_id':field_id,'cond':cond}
        }]
    }

    // call backend!
    select_switch(field_id){
        return this.backend_access()+[{
            'method':'select_switch',
            'params':{'field_id':field_id}
        }]
    }
    static html(data){var self = new MysqlFunctor(data);return self.view();}
    view (){ return <p>MysqlFunctor</p> }
}

// readMysql
export class readMysql {
    constructor(data) {
        
    }
    
    backend_access(){return [{'class': 'Plan', 'params': ['functor_id'], 'is_router': True}]}
    
    // call backend!
    modify_cond(field_id, cond){
        return this.backend_access()+[{
            'method':'modify_cond',
            'params':{'field_id':field_id,'cond':cond}
        }]
    }

    // call backend!
    select_switch(field_id){
        return this.backend_access()+[{
            'method':'select_switch',
            'params':{'field_id':field_id}
        }]
    }
    static html(data){var self = new readMysql(data);return self.view();}
    view (){ return <p>readMysql</p> }
}

// saveExcel
export class saveExcel {
    constructor(data) {
        
    }
    
    backend_access(){return [{'class': 'Plan', 'params': ['functor_id'], 'is_router': True}]}
    
    static html(data){var self = new saveExcel(data);return self.view();}
    view (){ return <p>saveExcel</p> }
}

// colAppend
export class colAppend {
    constructor(data) {
        
    }
    
    backend_access(){return [{'class': 'Plan', 'params': ['functor_id'], 'is_router': True}]}
    
    // call backend!
    modify_cond(field_id, cond){
        return this.backend_access()+[{
            'method':'modify_cond',
            'params':{'field_id':field_id,'cond':cond}
        }]
    }

    // call backend!
    select_switch(field_id){
        return this.backend_access()+[{
            'method':'select_switch',
            'params':{'field_id':field_id}
        }]
    }
    static html(data){var self = new colAppend(data);return self.view();}
    view (){ return <p>colAppend</p> }
}
