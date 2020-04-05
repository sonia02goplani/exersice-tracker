import React, { Component } from 'react';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            user_name: '',
            password: '',
            userid: '',
            isResultOK: false,
            isAuthDone: false
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
        }; console.log(newUser);
        axios.post('http://localhost:5000/users/register', newUser)
            .then(result => {
                console.log("result" + result.data)
                if (result.data) {
                    this.setState({ isResultOK: true , isAuthDone: true});
                }
            })
            .catch((error) => {
                console.log(error)
            })
    };
    renderRedirect = () => {
        if (this.state.isResultOK) {
            localStorage.setItem('UserName', this.state.user_name);
            localStorage.setItem('isLoggedIn', this.state.isAuthDone);
            return <Redirect to='/login' />
        }
    }
    render() {
        return (
            <Container className="App container">
                <h1 className="header">Exercise Tracker</h1>
                <h2 className="login_header">Register</h2>
                <Form className="form form_box" onSubmit={this.onSubmit}>
                    <Col>
                        <FormGroup className="input">
                            <Label>First Name</Label>
                            <Input
                                onChange={this.onChange}
                                value={this.state.first_name}
                                required
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
                                required
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
                                required
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
                                required
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




