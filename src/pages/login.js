import { Serach } from "../components/search";
import { Form,Input,Button,Checkbox} from 'antd';
import "../style/login.less"
import {Link} from "react-router-dom"

let vals=[
    
    {
        id:"password",
        val:[
            {min:6,message:"用户名或密码错误"},
            {max:16,message:"用户名或密码错误"},
            {reg:/^\w+$/,message:"用户名或密码错误"}
        ]
    }
]

function hasError(username,password,val){
    if(username.length<val.min||password.length<val.min ||username.length>val.max ||password.length>val.max ){
        return false
    }
    return true
    
}

class UI extends React.Component{
    constructor(props){
        super(props)
        this.state={
            img:"https://file.masstea.com/images/ats/2017/5/ats14958688522479645.png",
            usernameError:false,
            passwordError:false,
            xieyiError:false
        }
        this.gfd=this.props.form.getFieldDecorator
        this.getValue=this.props.form.getFieldValue
        this.reg=this.reg.bind(this)
    }

    reg(e){
        e.preventDefault()
        
        this.props.form.validateFieldsAndScroll((err, values) => {
           let isSuc=this.toTest(vals,values)
           let username=values.username
           let pwd=values.password
           console.log(isSuc)
            if(isSuc){
                let array=[]
                if(window.localStorage.userArr){//判断是否存在
                    array = JSON.parse(window.localStorage.userArr);
                }

                var isHad = false;//定义一个开关变量
                var index = 0 ; //定义一个下标确定用户
                //遍历数组进行匹配
                for(var i =0;i<array.length;i++){
                    if(username==array[i].username){//有这个账号
                        isHad=true;
                        index=i;
        
                    }
                }
                
                if(isHad){//如果存在
                    if(pwd==array[index].password){
                        alert("登录成功");

                        let obj = [{userId:username}]
                       
                        window.sessionStorage.userId=JSON.stringify(obj);
                        this.props.history.push("/home")
                        
                        
                        

                    }else{
                        this.setState({
                            passwordError:"用户名或密码错误"
                        })
                    }
                }else{//账号不存在或输入错误
                    this.setState({
                        passwordError:"用户名或密码错误"
                    })
                }
            }
        })

    }

    toTest(vals,values){
       let flag=null
        let username=values.username
        let password=values.password
        
        if(username&&password){
            
            vals.map(({val})=>{
                
                if(username.length>=6&&password.length>=6 &&username.length<=16 &&password.length<=16 ){
                   this.setState({
                        passwordError:""
                    })
                   flag= true
                   
                
                }else{
                    this.setState({
                        passwordError:"用户名或密码错误"
                    })
                    flag= false
                }
            })
        }else{
            this.setState({
                passwordError:"请输入用户名、密码"
            })
            flag= false
        }
        return flag
        
        
    }

    render(){
        let {usernameError,passwordError}=this.state
        return (
            <div>
                <Serach flag={1}/>
                <div className="login">
                    <div className="w1200 content">
                        <div className="left">
                            <img src={this.state.img}/>
                        </div>
                        <div className="right">
                            <h3>账号登录</h3>
                            <Form onSubmit={this.reg}>
                                <Form.Item
                                    validateStatus={usernameError?"error":""}
                                    
                                    label="用户名"
                                >
                                    {
                                        this.gfd("username")(<Input placeholder=""/>)
                                    }
                                </Form.Item>
                                
                                <Form.Item
                                    validateStatus={passwordError?"error":""}
                                    help={passwordError||""}
                                    label="密码"
                                    >
                                    {
                                        this.gfd("password")(<Input type="password" placeholder="" />)
                                    }
                                </Form.Item>
                                <Form.Item className="loginHandler">
                                    <Button type="primary" htmlType="submit">登录</Button>
                                </Form.Item>
                                <div className="foot">
                                    <div className="footLeft">
                                        <Link to="/register">
                                            立即注册
                                        </Link>
                                    </div>
                                    <div className="footRight">
                                        <Link to="">忘记密码？</Link>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export let Login=Form.create()(UI)