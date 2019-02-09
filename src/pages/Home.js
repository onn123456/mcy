import {connect} from "react-redux"
import { Nav } from "../components/nav";
import { Banner } from "../components/banner";
import { getHomeData } from "../action/action";
import { HomeList } from "../components/homeList";


class UI extends React.Component{
    constructor(props){
        super(props)
        this.go=this.go.bind(this)
    }
    componentDidMount(){
        this.props.getData()
    }
    go(){
        console.log(this.props)
    }
    render(){
        return(
            
            <div>
                <Nav {...this.props}></Nav>
                <Banner banner={this.props.banner}></Banner>
                <HomeList goods1={this.props.goods1} goods2={this.props.goods2}></HomeList>
            </div>
        )
    }
}


let mstp=({home})=>{
    return home
}

let mdtp=dispatch=>({
    getData(){
        dispatch(getHomeData())
    }
})

export let HOme=connect(mstp,mdtp)(UI)