import {Link} from "react-router-dom"
import {List,Card} from "antd"
import "./index.less"

export class GoodsList extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        
        return (
            <div className="goodsList">
                <List
                grid={{gutter:8,xs:1,sm:2,md:4,lg:4,xl:4,xxl:4}}
                dataSource={this.props.goods}
                renderItem={item=>(
                    <List.Item>
                        <Card >
                            <Link to={`/detail/${item.id}`}  title={item.text}>
                                <div className="sub_mingxing">
                                    <img src={item.img} alt="" />
                                </div>
                                <h3 className="pinpai">{item.text}</h3>
                                <p className="jiage">{item.price}</p>
                            </Link>
                        </Card>
                    </List.Item>
                )}
            />
            </div>
        )
    }
}