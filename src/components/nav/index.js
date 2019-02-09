import {Menu} from "antd"
import {Link} from "react-router-dom"
import { Header } from "../header";
import { Serach } from "../search";

export class Nav extends React.Component{
    constructor(props){
        super(props)
        this.state={
            list:[
                {text:"全部分类",path:"/goods"},
                {text:"首页",path:"/home"},
                {text:"茶博汇",path:"1"},
                {text:"超值消费",path:"2"},
                {text:"故里云",path:"3"},
                {text:"茶人评星",path:"4"},
                {text:"积分商城",path:"5"}
            ]
        }
        this.goPage=this.goPage.bind(this)
    }

    goPage(e){
        this.props.history.push(e.key)
        
    }


    render(){
        let {list}=this.state
        let listDom=list.map(({text,path})=>(
            <Menu.Item key={path}>
                {text}
            </Menu.Item>
        ))
        let currentKey=this.props.location.pathname
        return(
            <div>
                <Header {...this.props}></Header>
                <Serach></Serach>
                <div className="w1200">
                    <Menu
                        mode="horizontal"
                        defaultSelectedKeys={[currentKey]}
                        onClick={this.goPage}
                    >
                        {listDom}
                    </Menu>
                </div>
            </div>
        )
    }
}