
// function div_list(e_list, classify_map){
//   const r = {}
//   for(let [k,match_k] in classify_map.entries()){
//     r.setAttribute(k, []) 
//     for (let [index, e] in e_list.entries()){
//       if (match_k(e))
//         r.getAttribute(k).push(index)
//     }
//   }
//   return r
// }
// function select_div(s_list){
//   const r = div_list(s_list, {'selects':(e)=>e==true, 'unselects':(e)=>e==false})
//   return [r.selects, r.unselects]
// }