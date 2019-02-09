import {connect} from "react-redux"
import { getDetailState } from "../action/action";
import { Nav } from "../components/nav";
import "../style/detail.less"
import { DetailHeader } from "../components/detailHeader";

class UI extends React.Component{
    constructor(props){
        super(props)
        
    }
    componentDidMount(){
        this.props.getData()
    }
    

    render(){
        return (
            <div className="detail">
                <Nav {...this.props}/>
                <div className="detailList">
                    <div className="w1200">
                        <DetailHeader goods={this.props.goods} {...this.props}/>
                    </div>
                </div>
            </div>
        )
    }
}

let mstp=({detail})=>detail

let mdtp=(dispatch,props)=>{
    return {
        getData(){
            let {goodsId}=props.match.params
            dispatch(getDetailState(goodsId))
        }
    }
}

export let Detail=connect(mstp,mdtp)(UI)