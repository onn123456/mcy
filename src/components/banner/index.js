import {Carousel,Icon} from "antd"
import {Link} from "react-router-dom"
import "./index.less"

export class Banner extends React.Component{
    constructor(props){
        super(props)
        this.prev=this.prev.bind(this)
        this.next=this.next.bind(this)
    }

    prev(){
        this.refs.img.prev()
    }
    next(){
        this.refs.img.next()
    }

    render(){
        let {banner}=this.props
        let dom=banner.map(({img,path})=>(
            <div key={img}>
                <Link to={path}>
                    <img src={img}/>
                </Link>
                
            </div>
        ))
        return (
            <div className="banner">
                <Icon type="left" onClick={this.prev}/>
                <Carousel autoplay ref="img">
                    {dom}
                </Carousel>
                <Icon type="right" onClick={this.next}/>
            </div>
        )
    }
}