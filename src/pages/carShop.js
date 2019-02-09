import {connect} from "react-redux"
import { Header } from "../components/header";
import { Serach } from "../components/search";
import "../style/carShop.less"
import { getCarState ,changeNum, changeActive} from "../action/action";
import {Link} from "react-router-dom"

class UI extends React.Component{
    constructor(props){
        super(props)
        this.state={
            check:0,
            count:0,
            total:0,
            goods:this.props.goods
        }
        
    }

    componentDidMount(){
        this.props.getData()
        // console.log(this.props.goods)
        // console.log(this.state.goods)
    }
    componentWillUnmount(){
        // this.props.changGoods().bind(this)
       
        window.localStorage.goodsCar=JSON.stringify(this.state.goods)
        console.log(this.state.goods)
    }
    

    render(){
        let {goods}=this.props
        
        if(goods!=null){
            this.state.goods=goods
            console.log(this.state.goods) 
        }
      
        

        let dom=goods==null?(<p>正在加载...</p>):(
            this.state.goods.map(goods=>(
                <ul key={goods.id}>
                    <li>
                        <input className="danxuan" type="checkbox" checked={goods.active} onChange={this.props.oneChange(goods.id).bind(this)}/>
                    </li>
                    <li>
                        <Link to={`/detail/${goods.id}`}>
                            <img className="xiaotu" src={goods.img} alt="" />
                        </Link>
                    </li>
                    <li className="biaoti">
                        <Link to={`/detail/${goods.id}`}>
                            {goods.text}
                        </Link>
                    </li>
                    <li className="danjia">
                        {goods.price}
                    </li>
                    <li className="zg">
                        <span className="gwcDown" onClick={this.props.prev(goods.id,true).bind(this)} >-</span>
                        <input className="shuliang" type="number" ref={goods.id+""} value={(goods.num*1)} onChange={this.props.numChange(goods.id).bind(this)}/>
                        <span className="gwcUp" onClick={this.props.prev(goods.id,false).bind(this)}>+</span>
                    </li>
                    <li className="xiaoji">{goods.price*goods.num}</li>
                    <li className="shanchu"><span>×</span></li>
                </ul>
            ))
        )

        return(
            <div>
                <Header {...this.props}/>
                <Serach />
                <div className="w1200 shopcar">
                    <div className="gwc">
                        <div className="gwcTou">
                            <ul>
                                <li>
                                    <input className="quanxuan" type="checkbox" checked={this.state.check}  onChange={this.props.allCheck.bind(this)}/>
                                    全选
                                </li>
                                <li></li>
                                <li>商品名称</li>
                                <li>单价</li>
                                <li>数量</li>
                                <li>小计</li>
                                <li>操作</li>
                            </ul>
                            <div className="gwcInfo gwcTou">
                                {dom}
                            </div>
                        </div>

                        <div className="go">
                            <div className="del">
                                <span className="delS1" >批量删除</span>
                                <span className="delS2">已选择<span className="zongshuliang">{this.state.count}</span>件商品</span>
                            </div>
                            <div className="buy">
                                <span className="heji">合计：{this.state.total}</span>
                                <span className="jiesuan">结算</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

let mstp=({car})=>car

let mdtp=dispatch=>{
    return {
        getData(){
            dispatch(getCarState())
        },
        numChange(goodsId){
            return (function(e){
                let num=e.target.value*1
                let newGoods=this.state.goods
                newGoods.map(item=>{
                    if(item.id==goodsId){
                        if(num<1){
                            item.num=1
                        }else{
                            item.num=num
                        }
                        return
                    }
                })
                this.setState({
                    goods:newGoods
                })

                this.props.changeCount.bind(this)()
                this.props.total.bind(this)()
            })
        },
        prev(goodsId,flag){
            return (function(e){
                let num=e.target.parentNode.children[1].value*1
                if(flag){
                    e.target.parentNode.children[1].value=num-1
                    if(num<1){
                        e.target.parentNode.children[1].value=1
                    }
                }else{
                    e.target.parentNode.children[1].value=num+1
                }


                
                // dispatch(changeNum(goodsId,e.target.parentNode.children[1].value))
                let newGoods=this.state.goods
                newGoods.map(item=>{
                    if(item.id==goodsId){
                        if(flag){
                            item.num-=1
                            if(num<=1){
                                item.num=1
                            }
                        }else{
                            item.num+=1
                        }
                        
                        return
                    }
                })
                this.setState({
                    goods:newGoods
                })
                this.props.changeCount.bind(this)()
                this.props.total.bind(this)()

            })
        },
        allCheck(e){
            e.target.checked?this.setState({check:true}):this.setState({check:false})
            
            // this.state.goods.map((item,i)=>{
            //     item.active=e.target.checked
            // })
            
            // dispatch(changeNum(goodsId,e.target.value))
            // dispatch(changeActive(e.target.checked))

            let newGoods=this.state.goods
            newGoods.map((item,i)=>{
                item.active=e.target.checked
            })
            this.setState({
                goods:newGoods
            })

            this.props.changeCount.bind(this)()
            this.props.total.bind(this)()
              
        },
        oneChange(goodsId){
            return (function(e){
                let flag=true
                let newGoods=this.state.goods

                newGoods.map(item=>{
                    if(item.id==goodsId){
                        item.active=e.target.checked?true:false
                    }
                    if(!item.active){
                        this.setState({check:false})
                        flag=false   
                    }
                    
                })
                if(flag)this.setState({check:true})
                this.props.changeCount.bind(this)()
                this.props.total.bind(this)()

                // this.forceUpdate()//强制视图更新  
                // dispatch(changeActive(e.target.checked,goodsId))
            }
            )
        },
        changeCount(){//总数量
            let num=0
            this.state.goods.map(item=>{
                
                if(item.active){
                    num=num+item.num*1
                }
            })
            this.setState({count:num})
        },
        total(){//总价
            let num=0
            this.state.goods.map(item=>{
                if(item.active){
                    num=num+item.price*item.num
                    
                }
            })
            
            this.setState({total:num})
        },
        changGoods(){
            // dispatch(changeActive(this.state.goods))
            console.log(this)
        }

    
    }
}

export let CarShop=connect(mstp,mdtp)(UI)