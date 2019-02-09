import { HOme } from "./pages/Home";
import {Route,Switch,Redirect} from "react-router-dom"
import { Goods } from "./pages/Goods";
import { Detail } from "./pages/Detail";
import { CarShop } from "./pages/carShop";
import { Login } from "./pages/login";
import { Register } from "./pages/register";



export class Index extends React.Component{
    render(){
        return(
            <Switch>
                <Redirect path="/" exact={true} to="/home"></Redirect>
                <Route path="/home" component={HOme}></Route>
                <Route path="/goods" component={Goods}/>
                <Route path="/detail/:goodsId" component={Detail} />
                <Route path="/carShop" component={CarShop} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
        )
    }
}