import { HOME_INIT } from "../action/actionType";

export let home=(state={
    banner:[],
    goods1:null,
    goods2:[],
    goods3:[]
    
},action)=>{
    let newState={...state}

    switch(action.type){
        case HOME_INIT:
            newState.banner=action.banner
            newState.goods1=action.goods1
            newState.goods2=action.goods2
            newState.goods3=action.goods3
            return newState
        default:
            return state
    }
}