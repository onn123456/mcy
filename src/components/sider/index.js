import {Link} from "react-router-dom"
import "./index.less"

export class GoodsSider extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
         
        return (
            <div className="sider">
                {/* <Link to={`/detail/${item.id}`}  title={item.text}>
                    <div className="sub_mingxing">
                        <img src={item.img} alt="" />
                    </div>
                    <h3 className="pinpai">{item.text}</h3>
                    <p className="jiage">{item.price}</p>
                </Link> */}

                <h3>热销商品</h3>
            </div>
        )
    }
}