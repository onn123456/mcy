import {Link} from "react-router-dom"
import "./index.less"

export class Header extends React.Component{
    constructor(props){
        super(props)
        this.state={
            left:[
                {text:"请登录",path:"/login"},
                {text:"立即注册",path:"/register"},
                {text:"购物车",path:""}
            ],
            right:[
                {text:"个人中心",path:""},
                {text:"商家中心",path:""}
            ],
            username:null
        }
        this.exit=this.exit.bind(this)
    }

    exit(e){
        sessionStorage.removeItem("userId")
        this.setState({
            username:null
        })
        // console.log(this.props.match.path)
        if(this.props.match.path=="/carShop"){
            this.props.history.push("/home")
        }
    }
    componentDidMount(){
        if(window.sessionStorage.userId){
            this.setState({
                username:JSON.parse(window.sessionStorage.userId)[0].userId
            })
        }
    }

    render(){
        // let leftDom=this.state.left.map(({text,path})=>(<li key={text}><Link to={path}>{text}</Link></li>))
        let leftDom=null
        if(window.sessionStorage.userId){
            let username=JSON.parse(window.sessionStorage.userId)[0].userId
            
            leftDom=(
                <ul className="left">
                    <li>
                        欢迎您！{this.state.username}
                    </li>
                    <li className="exit" onClick={this.exit}>
                        [退出]
                    </li>
                    <li>
                        <Link to="/carShop">购物车</Link>
                    </li>
                </ul>
            )
        }else{
            leftDom=(<ul className="left">
                <li>
                    <Link to="/login">
                    请登录
                    </Link>
                </li>
                <li>
                    <Link to="/register">
                    注册
                    </Link>
                </li>
                <li>
                    <Link to="/carShop">购物车</Link>
                </li>
            </ul>)
        }

        let rightDom=this.state.right.map(({text,path})=>(<li key={text}><Link to={path}>{text}</Link></li>))
        return(
            <header>
                <div className="w1200 header">
                    
                        {leftDom}
                    
                    <ul className="right">
                        {rightDom}
                    </ul>
                </div>
            </header>
        )
    }
}