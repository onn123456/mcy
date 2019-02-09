import "./index.less"

export class DetailHeader extends React.Component{
    constructor(props){
        super(props)
        this.state={
            num:1,
            img:null
        }
        this.changeImg=this.changeImg.bind(this)
        this.numChange=this.numChange.bind(this)
        this.change1=this.change1.bind(this)
        this.change2=this.change2.bind(this)
        this.add=this.add.bind(this)
    }
    

    numChange(e){
        this.setState({
            num:e.target.value
        })
    }
    change1(){
        let a=this.state.num
        a<=1?(this.setState({num:1})):(this.setState({num:a-=1}))
    }
    change2(){
        let a=this.state.num*1
        this.setState({
            num:a+=1
        })
    }
    add(flag){
        return (function(){
            let {id,text,price,img}=this.props.goods
            let array=[]
                if(window.localStorage.goodsCar){//判断是否存在
                    array = JSON.parse(window.localStorage.goodsCar);
                }
                for(var i =0;i<array.length;i++){
                    //判断是否有相同
                    if(id==array[i].id){
                        array[i].num+=this.state.num
                        window.localStorage.goodsCar=JSON.stringify(array);
                        if(flag){
                          if(confirm("商品添加成功，是否前往购物车结算？")){
                                this.props.history.push("/carShop")
                                
                            }
                            return  
                        }else{
                            this.props.history.push("/carShop")
                            
                            return
                        }
                        
                    }
                }
               
                let obj = {id:id,text:text,price:price,num:this.state.num,img:img}
                array.push(obj);
                window.localStorage.goodsCar=JSON.stringify(array);
                if(flag){
                    if(confirm("商品添加成功，是否前往购物车结算？")){
                        this.props.history.push("/carShop")
                        
                      }
                      return  
                  }else{
                    this.props.history.push("/carShop")
                    
                  }

        }).bind(this)
    }

    changeImg(e){
        console.log(this.props)
        this.setState({
            img:e.target.src
        })
        
    }

    render(){
        let {goods}=this.props

        let imgDom=goods==null?<p></p> : goods.banner.map(item=>(
            <li key={item} onClick={this.changeImg}>
                <img key={item} src={item}/>
            </li>
        ))

        let imgsDom=goods==null?<p></p> : goods.imgs.map(item=>(
            <div key={item}>
                <img src={item}/>
            </div>
        ))

        let dom=goods==null?<p>正在加载...</p> : (
            <div className="detailHeader">
                <div className="header">
                    <div className="left">
                        <div className="leftImg">
                            <img src={this.state.img==null?goods.img:this.state.img}/>
                        </div>
                        <div className="rightImg">
                            <ul>
                                {imgDom}
                            </ul>
                            {/* <img src={goods.img}/> */}
                        </div>
                    </div>
                    <div className="right">
                        <h3>{goods.text}</h3>
                        <p className="p1">市场价：<del> {goods.zgPrice}</del></p>
                        <p className="p2">商城价：<span> {goods.price}</span></p>
                        <p className="p3">
                        <span>数量：</span>
                            <span className="s1" onClick={this.change1}>-</span><input type="number" value={this.state.num} onChange={this.numChange} /><span onClick={this.change2} className="s1">+</span>
                        </p>
                        <div className="add">
                            <div className="buy" onClick={this.add(false)}>立即购买</div>
                            <div className="addGwc" onClick={this.add(true)}>加入购物车</div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    {imgsDom}
                </div>
            </div>
            
        )

        return dom
    }
}