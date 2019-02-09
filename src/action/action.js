import axios from "axios"
import { HOME_INIT, GOODS_INIT, DETAIL_INIT, CAR_INIT } from "./actionType";

export let setHomeList=(banner,goods1,goods2,goods3)=>({
    type:HOME_INIT,
    banner,
    goods1,
    goods2,
    goods3
})

export let getHomeData=()=>{
    return dispatch=>{
        axios.get("/server/home.json").then(({data})=>{
            dispatch(setHomeList(data.banner,data.jrhd,data.cxdz,data.xpsj))
        })
    }
}

export let setGoodsList=(goods,count,page)=>({
    type:GOODS_INIT,
    goods,
    count,
    page
})

export let getGoodsData=(page=1)=>{
    return dispatch=>{
        axios.get("/server/goods.json").then(({data})=>{
            let {goods}=data

            let allCount=goods.length//总条数

            let count=16//每页16条数据

            let allPage=Math.ceil(allCount/count)//总页数

            let newGoods=[]//存放单页goods

            for(let i=(page-1)*count;i<(page==allPage?allCount:page*count);i++){
                newGoods.push(goods[i])
            }



            dispatch(setGoodsList(newGoods,allCount,page))
        })
    }
}

export let setDetailList=goods=>({
    type:DETAIL_INIT,
    goods
})

export let getDetailState=goodsId=>{
    return dispatch=>{
        axios.get("/server/goods.json").then(({data})=>{
            let {goods}=data
            let newGoods=null

            goods.map(item=>{
                if(item.id==goodsId)
                newGoods={...item}
            })

            dispatch(setDetailList(newGoods))
        })
    }
}

export let setCarShop=goods=>({
    type:CAR_INIT,
    goods
})

export let getCarState=()=>{
    return dispatch=>{
        let array = JSON.parse(window.localStorage.goodsCar)
        dispatch(setCarShop(array))
    }
}

export let changeNum=(goodsId,num)=>{
    return dispatch=>{
        let array=JSON.parse(window.localStorage.goodsCar)
        array.map(item=>{
            if(item.id==goodsId){
                if(num<1){
                    item.num=1
                }else{
                    item.num=num
                }
                return
            }
        })

        window.localStorage.goodsCar=JSON.stringify(array)
        dispatch(setCarShop(array))
    }
}

export let changeActive=(goods)=>{
    return dispatch=>{
        // let array=JSON.parse(window.localStorage.goodsCar)
        // if(goodsId){
        //     array.map(item=>{
        //         if(item.id==goodsId){
        //             item.active=active
        //         }
        //     })
        // }else{
        //     array.map(item=>{
        //         item.active=active
        //     })
        // }
        // console.log(array)
        window.localStorage.goodsCar=JSON.stringify(goods)
        dispatch(setCarShop(array))
    }
}