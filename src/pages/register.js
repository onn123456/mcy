import { Serach } from "../components/search";
import "../style/register.less"
import { Row,Col,Form,Input,Button,Checkbox} from 'antd';

let vals=[
    {
        id:"username",
        val:[
            {min:6,message:"用户名长度最少6位!"},
            {max:16,message:"用户名长度最多16位!"},
            {reg:/^\w+$/,message:"用户名只能由字母、数字和下划线组成!"}
        ]
    },
    {
        id:"password",
        val:[
            {min:6,message:"密码长度最少6位!"},
            {max:16,message:"密码长度最多16位!"},
            {reg:/^\w+$/,message:"密码只能由字母、数字和下划线组成!"},
            {pwd:1,message:"两次密码不一致!"}
        ]
    },
    {
        id:"xieyi",
        val:[
            {message:"请阅读并勾选协议"}
        ]
        
    }
]


function hasError(value="",validators,pw2=false){
    let message=[]
    validators.map(val=>{
        if(val.min&&value.length<val.min){
            message.push(val.message)
        }else if(val.max && value.length>val.max){
            message.push(val.message)
        }else if(val.reg&&!val.reg.test(value)){
            message.push(val.message)
        }else if(val.pwd){
            if(pw2){
               if(pw2!=value){
                    message.push(val.message)
                } 
            }
            
        }
    })
    return message.length>0 ? message:false
}





class UI extends React.Component{
    constructor(props){
        super(props)
        this.state={
            usernameError:false,
            passwordError:false,
            xieyiError:false,
            check:true
        }
        this.gfd=this.props.form.getFieldDecorator
        this.getValue=this.props.form.getFieldValue
        this.reg=this.reg.bind(this)
        this.validator=this.validator.bind(this)
    }

    reg(e){
        e.preventDefault()
        let isSuc=this.toTest(vals)

        if(isSuc){
            console.log(e)
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                  console.log('Received values of form: ', values);
                  let username=values.username
                  let password=values.password

                  let array=[]
                  if(window.localStorage.userArr){//判断是否存在
                      array = JSON.parse(window.localStorage.userArr);
                  }
                  for(var i =0;i<array.length;i++){
                      //判断是否有相同账号
                      if(username==array[i].username){
                          this.setState({
                              usernameError:"该用户名已存在"
                          })
                          return
                      }
                  }
                  let obj = {username:username,password:password}
                  array.push(obj);
                  window.localStorage.userArr=JSON.stringify(array);
                  alert("注册成功，跳转至登录界面")
                  this.props.history.push("/login")

                }
              })
            
        }
    }

    toTest(vals,valid,pw=false){
        let isSuc=true
        
        vals.map(({id,val})=>{
            if(!valid||id==valid){
                let value=this.getValue(id)
                let isError=null
                if(pw){
                    let value2=this.getValue(pw)
                    isError =hasError(value,val,value2)
                }else{
                    isError=hasError(value,val)
                }
                
                if(isError){
                    isSuc=false
                }
                this.setState({
                    [id+"Error"]:isError
                })
            }
        })
        return isSuc
    }
    toXieyi(valid,checked){
        let isSuc=true
        vals.map(({id,val})=>{
            if(id==valid){
                let isError=null
                if(!checked){
                    isError=(val[0].message)
                    this.setState({
                        check:false
                    })
                }else{
                    this.setState({
                        check:true
                    })
                }
                if(isError){
                    isSuc=false
                }
                this.setState({
                    xieyiError:isError,
                })
            }
        })
        return isSuc
    }

    validator(e){
        if(e.target.id=="password1"){
            this.toTest(vals,"password",e.target.id)
        }else if(e.target.id=="xieyi"){
            this.toXieyi(e.target.id,e.target.checked)

        }else{
            this.toTest(vals,e.target.id)
            
        }
        
    }

    render(){
        let {usernameError,passwordError,xieyiError}=this.state
        return (
            <div className="register1">
                <Serach flag={2}/>
                <div className="register">
                    <div className="w1200 content">
                        <h3>注册</h3>
                        <Form onChange={this.validator} onSubmit={this.reg}>
                            <Form.Item
                                validateStatus={usernameError?"error":""}
                                help={usernameError||""}
                                label="用户名"
                            >
                                {
                                    this.gfd("username")(<Input placeholder="用户名由6-16位字母、数字和下划线组成"/>)
                                }
                            </Form.Item>
                            <Form.Item
                                validateStatus={passwordError?"error":""}
                                label="密码"
                            >
                                {
                                    this.gfd("password")(<Input type="password" placeholder="密码6-16位字母、数字和下划线组成" />)
                                }
                            </Form.Item>
                            <Form.Item
                                validateStatus={passwordError?"error":""}
                                help={passwordError||""}
                                label="重复密码"
                                >
                                {
                                    this.gfd("password1")(<Input type="password" placeholder="请重复密码" />)
                                }
                            </Form.Item>
                            <Form.Item
                            validateStatus={xieyiError?"error":""}
                            help={xieyiError||""}  
                            >
                                {this.gfd("xieyi")(<Checkbox checked={this.state.check}>我已阅读并同意<a>用户协议</a></Checkbox>)}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">注册</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}


export let Register=Form.create()(UI)