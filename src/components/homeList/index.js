import {Link} from "react-router-dom"
import {Icon} from "antd"
import "./index.less"

export class HomeList extends React.Component{
    constructor(props){
        super(props)
        this.go=this.go.bind(this)
    }

    go(){
        console.log(this.props.goods1[0].img)
    }
    render(){
        let {goods1,goods2}=this.props
        let toDayDom= goods1==null ? <p>正在加载...</p> : (
            <div className="w1200 toDay">
                <div className="biaoti">
                    <h2>今日活动</h2>
                    <Link to="/goods">更多
                        <Icon type="right"/>
                    </Link>
                </div>
                <div className="content">
                    <div className="left">
                        <Link to={`/detail/${goods1[0].id}`}>
                            <img className="img2" src={goods1[0].img}/>
                        </Link>
                        <Link to={`/detail/${goods1[1].id}`}>
                            <img src={goods1[1].img}/>
                        </Link>
                    </div>
                    <div className="right">
                        <Link to={`/detail/${goods1[2].id}`}>
                            <img className="img1" src={goods1[2].img}/>
                        </Link>
                        <Link to={`/detail/${goods1[3].id}`}>
                            <img src={goods1[3].img}/>
                        </Link>
                    </div>
                </div>
            </div>
        )

        let jxDom=goods2==null?<p></p>:(
            <div className="w1200 toDay">
                <div className="biaoti">
                    <h2>精选茶</h2>
                    <Link to="/goods">更多
                        <Icon type="right"/>
                    </Link>
                </div>
                <div className="jxContent">
                    <ul>
                        {goods2.map(({id,img})=>(
                        <li key={img}>
                            <Link to={`/detail/${id}`}>
                                <img src={img}/>
                            </Link>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        )

        return(
            <div className="homeContent">
                {toDayDom}
                {jxDom}
            </div>
        )
    }
}