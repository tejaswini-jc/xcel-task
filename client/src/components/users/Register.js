import React from 'react'
import {connect} from 'react-redux' 
import {startRegisterUser} from '../../actions/user'
import {Col, Row, Button, FormGroup, Label, Input } from 'reactstrap';
import login from './login.png'

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state={
            firstname:'',
            lastname:'',
            email:'',
            password:'',
            firstnameError:"",
            lastnameError:"",
            emailError:"",
            passwordError:""
        }
    }
    validate = () => {
        let firstnameError=""
        let lastnameError=""
        let emailError=""
        let passwordError=""
        if(!this.state.firstname){
            firstnameError='(Incorrect)'
        }
        if(!this.state.lastname){
            lastnameError='(Incorrect)'
        }
        if(!this.state.email){
            emailError='(Entered email is incorrect)'
        }
        if(!this.state.password){
            passwordError='(Hey you forgot to create the password)'
        }
        if(emailError|| passwordError || firstnameError || lastnameError){
            this.setState({emailError, passwordError, firstnameError, lastnameError})
            return false
        }
        return true
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const isValid = this.validate()
        if(isValid){
            const formData = {
                firstname:this.state.firstname,
                lastname:this.state.lastname,
                email:this.state.email,
                password:this.state.password
            }
            this.props.dispatch(startRegisterUser(formData,this.props))
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
            
            <form onSubmit={this.handleSubmit}>
                <Row>
                    <div className="col-md-6" style = {{width:'100%', height: '100%'}}>
                    <img src={login} alt="..."/>
                    </div>
                <div className="col-md-6 text-center ">
                <h3 className="text-center">Join our community!</h3>
                    <h6 className="text-muted text-center">Already have an account?<a href="/users/login" className="text-dark">Login</a></h6><br/>
                    <Row form>
                        <Col md={6}>
                        <FormGroup>
                            <div style={{display: 'flex'}}>
                            <Label htmlFor="firstname">FirstName</Label>
                                <div style = {{color:'red', paddingLeft: '10px'}}>{this.state.firstnameError} </div>
                            </div>
                            <Input type="text" className="form-control form-control-sm mb-1" value={this.state.firstname} id="firstname"  name="firstname"placeholder="Enter Firstname..." onChange={this.handleChange} />
                        </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup>
                            <div style={{display: 'flex'}}>
                            <Label htmlFor="lastname">LastName</Label>
                                <div style = {{color:'red', paddingLeft: '10px'}}>{this.state.lastnameError} </div>
                            </div>
                            <input type="text" className="form-control form-control-sm mb-1" placeholder="Enter lastname..." name="lastname" value={this.state.lastname} onChange={this.handleChange}/>
                        </FormGroup>
                        </Col>
                    </Row>
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
                <Button color="success" size="sm" block>Join our community</Button><br/>
                <h6 className="text-muted text-center">By joining you agree to the <strong className="text-dark">Terms</strong> and <strong className="text-dark">Privacy Policy</strong></h6>
                </div>
                </Row>
            </form>
         </div>
        )
    }
}
export default connect()(Register)