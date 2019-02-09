import {BrowserRouter as Router,Route} from "react-router-dom"
import {Provider} from "react-redux"
import {store} from "./store"
import { Index } from ".";


export let AppRouter=props=>(
    <Provider store={store}>
        <Router>
            <Route path="/" component={Index}></Route>
        </Router>
    </Provider>

)