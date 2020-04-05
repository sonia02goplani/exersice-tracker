import React , {Component} from 'react';
import {   Container, Col, Form,
    FormGroup, Label, Input,
    Button, } from 'reactstrap';
    import {Link, Redirect} from "react-router-dom";
    import axios from "axios";
import ExerciseList from './exercise-list.component';

export default class CreateUser extends Component {
    constructor(props){
        super(props);
        this.state={
          first_name:'',
          last_name:'',
          user_name:'',
          password:'',
          isResultOK: false
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };
      onSubmit = e => {
        e.preventDefault();
        const newUser = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        user_name: this.state.user_name,
        password: this.state.password
        };console.log(newUser);
        axios.post('http://localhost:5000/users/register' , newUser)
        .then(result =>{
            console.log("result" + result.data)
            if(result.data){
                this.setState({ isResultOK: true});
            }
        })
      };
      renderRedirect = () => {
        if (this.state.isResultOK) {
          return <Redirect to='/exerciseTracker' />
        }
    }
    render() {
        // const { errors } = this.state;
        return(
            <Container className="App container">
            <h1 className="header">Exercise Tracker</h1>
            <h2 className="login_header">Register</h2>
            <Form className="form form_box" onSubmit ={this.onSubmit}>
            <Col>
                <FormGroup className="input">
                  <Label>First Name</Label>
                  <Input
                  onChange={this.onChange}
                  value={this.state.first_name}
                //   error={errors.first_name}
                    type="text"
                    id="first_name"
                    placeholder="First Name"
                  />
                </FormGroup>
              </Col>
            <Col>
                <FormGroup>
                  <Label>Last Name</Label>
                  <Input
                   onChange={this.onChange}
                   value={this.state.last_name}
                //    error={errors.last_name}
                    type="text"
                    id="last_name"
                    placeholder="Last Name"
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>User Name</Label>
                  <Input
                  onChange={this.onChange}
                  value={this.state.user_name}
                //   error={errors.user_name}
                    type="text"
                    name="user_name"
                    id="user_name"
                    placeholder="User name"
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Password</Label>
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
              <p className="question">Already have an account? <Link to="/login">Log in</Link></p>
            
            </Form>
          </Container>
                  )
                };
              }
            
    
      

    