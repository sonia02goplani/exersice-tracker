import React , {Component} from 'react';
import {   Container, Col, Form,FormGroup, Label, Input,Button, } from 'reactstrap';
import {Link, Redirect} from "react-router-dom";
import './login.css'; 
import axios from "axios";
export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
        user_name:'',
        password:'',
        userId: '',
        isAuthDone: false
        }
        localStorage.clear();

       }
       onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
        console.log(this.state.user_name)
      };
      
     
      onSubmit = e =>{
        e.preventDefault();   

        const userData = {
            user_name: this.state.user_name,
            password: this.state.password
          };
          axios.post('http://localhost:5000/users/login' , userData)
          .then(result =>{
              console.log("result" + result.data);
              if(result.data){
                  this.setState({...this.state , isAuthDone: true, userId: result.data})

              }
          })
          .catch((error) =>{
            console.log(error)
          })
      }
      renderRedirect = () => {
        if (this.state.isAuthDone) {
            localStorage.setItem('UserName', this.state.user_name);
            localStorage.setItem('UserID', this.state.userId);
            localStorage.setItem('isLoggedIn', this.state.isAuthDone);

          return <Redirect to='/exerciseTracker' />
        }
    }
    render() {
        const { errors } = this.state;
        return ( <Container className="App container">
            <h1 className="header">Exercise Tracker</h1>
        <h4 className="login_header">Log In</h4>
        
        <Form className="form form_box" onSubmit={this.onSubmit}>
          
          <Col>
            <FormGroup className="input">
              <Label>User Name</Label>
              <Input
              onChange={this.onChange}
              value={this.state.user_name}
            //   error={errors.user_name}
                type="text"
                name="user_name"
                id="user_name"
                placeholder="User Name"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="input">
              <Label for="examplePassword">Password</Label>
              <Input
              onChange={this.onChange}
              value={this.state.password}
            //   error={errors.password}
                type="password"
                name="password"
                id="password"
                placeholder="********"
              />
            </FormGroup>
          </Col>
     <div>
         {this.renderRedirect()}
          <Button color="primary">Submit</Button>
    </div>
          <p className="question">Do not have a Account? <Link to="/register">Register</Link></p>
        </Form>
      </Container>)
    }
}
