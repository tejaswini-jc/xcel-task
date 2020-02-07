import React from 'react'
import {connect} from 'react-redux'
import {startLoginUser} from '../../actions/user'
import {Button, FormGroup, Label,Row} from 'reactstrap';
import login from './login.png'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            emailError:"",
            passwordError:""
        }
    }
    validate = () => {
        let emailError=""
        let passwordError=""
        if(!this.state.email){
            emailError='(Entered email is incorrect)'
        }
        if(!this.state.password){
            passwordError='(Hey you forgot to create the password)'
        }
        if(emailError|| passwordError){
            this.setState({emailError, passwordError})
            return false
        }
        return true
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const isValid = this.validate()
        if(isValid){
            const formData = {
                email:this.state.email,
                password:this.state.password
            }
            console.log(formData)
            this.props.dispatch(startLoginUser(formData,this.props))
        }
        
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render(){
        return(
            <div className="container">
                <Row>
                <div className="col-md-6" style = {{width:'100%', height: '100%'}}>
                <img src={login} alt="..."/>
                </div>
                <div className="col-md-5" style = {{paddingcentre:'80%'}}>
                <h3 className="text-center">Login our community</h3>
                <h6 className="text-muted text-center">Don't have an account?<a href="/users/register" className="text-dark">Sign Up</a></h6><br/>
                <form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <div style={{display: 'flex'}}>
                        <Label htmlFor="email">Email</Label>
                        <div style = {{color:'red', paddingLeft: '10px'}}>{this.state.emailError} </div>
                    </div>
                    <input type="text" className="form-control form-control-sm mb-1" placeholder="Enter email..."  name="email" value={this.state.email} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <div style={{display: 'flex'}}>
                        <Label htmlFor="password">Password</Label>
                        <div style = {{color:'red', paddingLeft: '10px'}}>{this.state.passwordError} </div>
                    </div>
                    <input type="password" className="form-control form-control-sm mb-1" placeholder="Enter Password..."  name="password" value={this.state.password} onChange={this.handleChange}/>
                </FormGroup>
                <Button color="success" size="sm" block>Submit</Button><br/>
                <h6 className="text-muted text-center">By joining you agree to the <strong className="text-dark">Terms</strong> and <strong className="text-dark">Privacy Policy</strong></h6>
                </form>
                </div>
                </Row>
            </div>
        )
    }
}
export default connect()(Login)