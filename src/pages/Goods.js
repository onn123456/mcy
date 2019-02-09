import {connect} from "react-redux"
import { getGoodsData } from "../action/action";
import { Nav } from "../components/nav";
import {Layout,Pagination} from "antd"
let {Sider,Content}=Layout
import "../style/goods.less"
import { GoodsList } from "../components/goodsList";
import { GoodsSider } from "../components/sider";


class UI extends React.Component{
    constructor(props){
        super(props)
        this.change=this.change.bind(this)
    }
    componentDidMount(){
        let {currentPage}=this.props
        this.props.getData(currentPage)
    }
    change(page){
        this.props.getData(page)
    }

    render(){
        let {id,text}=this.props.goods
        return (
            <div className="goodsContent">
                <Nav {...this.props}></Nav>
                <div className="content">
                    <div className="w1200">
                        <Layout>
                            <Sider>
                                <GoodsSider ></GoodsSider>
                            </Sider>
                            <Content>
                                <GoodsList goods={this.props.goods}/>
                                <Pagination
                                    showQuickJumper
                                    defaultCurrent={this.props.currentPage}
                                    total={this.props.count}
                                    onChange={this.change}
                                    defaultPageSize={16}
                                />
                            </Content>
                        </Layout>
                    </div>
                </div>
            </div>
        )
    }
}


let mstp=({goods})=>goods

let mdtp=dispatch=>({
    getData(page){
        dispatch(getGoodsData(page))
    }
})

export let Goods=connect(mstp,mdtp)(UI)