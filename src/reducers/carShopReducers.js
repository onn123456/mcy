import { CAR_INIT } from "../action/actionType";


export let car=(state={
    goods:null
},action)=>{
    let newState={...state}
    switch(action.type){
        case CAR_INIT:
            newState.goods=action.goods
            return newState
        default:
            return state
    }
}