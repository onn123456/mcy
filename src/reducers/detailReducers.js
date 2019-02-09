import { DETAIL_INIT } from "../action/actionType";

export let detail=(state={
    goods:null
},action)=>{
    let newState={...state}
    switch(action.type){
        case DETAIL_INIT:
            newState.goods=action.goods
            return newState
        default:
            return state
    }
}