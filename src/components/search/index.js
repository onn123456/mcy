import {Link} from "react-router-dom"
import "./index.less"
import {Icon} from "antd"

export class Serach extends React.Component{
    constructor(props){
        super(props)
        this.state={
            logo:{img:"https://www.masstea.com/assetes/Themes/Images/Base/logo-lg.png",path:"/home"},
            flag:false
        }
    }

    render(){
        let {img,path}=this.state.logo
        let dom=this.props.flag==true?<p></p>:(
            <div className="search">
                <input type="text" placeholder="峨眉雪芽"/>
                <button>
                    <Icon type="search"></Icon>
                </button>
            </div>
        )

        let dom1=null
        if(this.props.flag==1){
            dom1=(<p></p>)
        }else if(this.props.flag==2){
            dom1=(
                <div className="toLogin">
                    <Link to="/login">登录</Link>
                </div>

            )
        }else{
            dom1=(
                <div className="search">
                <input type="text" placeholder="峨眉雪芽"/>
                <button>
                    <Icon type="search"></Icon>
                </button>
            </div>
            )
        }

        return(
            <div className="logo">
                <div className="w1200">
                    <h1>
                        <Link to={path}>
                            <img src={img}/>
                        </Link>
                    </h1>

                    <div className="right">
                        {/* <div className="search">
                            <input type="text" placeholder="峨眉雪芽"/>
                            <button>
                                <Icon type="search"></Icon>
                            </button>
                        </div> */}
                        {/* {dom} */}
                        {dom1}
                        <div className="car">
                            <i className="icon-daohanggouwuche"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}