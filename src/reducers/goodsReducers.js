import { GOODS_INIT } from "../action/actionType";


export let goods=(state={
    goods:[],
    currnetPage:1,
    count:0 
},action)=>{
    let newState={...state}

    switch(action.type){
        case GOODS_INIT:
            delete action.type
            newState={...state,...action}
            return newState
        default:
            return state
    }
}