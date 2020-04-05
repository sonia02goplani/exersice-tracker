import React, { Component } from 'react';
import Navbar from './navbar.component'
import { Container, Col, Form, FormGroup, Label, Input, Button, } from 'reactstrap';
import './create-exercise.css'
import { Redirect } from "react-router-dom";
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
export default class EditExercise extends Component {

    constructor(props) {
        super(props);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.state = {
            username: localStorage.getItem('UserName'),
            userid: localStorage.getItem('UserID'),
            description: '',
            duration: 0,
            date: new Date(),
            isLoggedIn: localStorage.getItem('isLoggedIn'),
            isResultOK: false

        }
    }
    componentDidMount() {
        console.log(this.props.match.params.id)
        axios.post('http://localhost:5000/exercises/edit', { id: this.props.match.params.id })

            .then(response => {
                this.setState({
                    ...this.state,
                    description: response.data[0].description,
                    duration: response.data[0].duration,
                    data: response.data[0].date
                })
                console.log("edit" + response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    };
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }
    onSubmit = e => {
        e.preventDefault();
        const newLog = {

            username: localStorage.getItem('UserName'),
            userid: localStorage.getItem('UserID'),
            description: this.state.description,
            duration: Number(this.state.duration),
            date: this.state.date,
            id: this.props.match.params.id

        };
        if (this.state.isLoggedIn) {
            axios.post('http://localhost:5000/exercises/update', newLog)
                .then(result => {
                    console.log("result" + result.data)
                    if (result.data) {
                        this.setState({ isResultOK: true });
                    }
                })
        }

    };
    renderRedirect = () => {
        if (this.state.isResultOK) {

            return <Redirect to='/exerciseTracker' />
        }
    }

    render() {
        return (

            <Container className="App container">
                <Navbar />
                <h2 className="login_header">Edit Exercise LOG</h2>
                <Form className="form form_box" onSubmit={this.onSubmit}>
                    <Col>
                        <FormGroup>
                            <Label>User Name</Label>
                            <Input
                                onChange={this.onChange}
                                value={this.state.username}
                                //   error={errors.user_name}
                                disabled
                                type="text"
                                name="username"
                                id="username"
                                placeholder="User name"
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup className="input">
                            <Label>Description</Label>
                            <Input
                                onChange={this.onChange}
                                value={this.state.description}
                                required
                                //   error={errors.first_name}
                                type="textarea"
                                id="description"
                                placeholder="Description"
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Duration ( in Minutes )</Label>
                            <Input
                                onChange={this.onChange}
                                value={this.state.duration}
                                required
                                //    error={errors.last_name}
                                type="number"
                                id="duration"
                                placeholder="Duration"
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label >Date</Label><br></br>
                            <DatePicker className="DateInput"
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </FormGroup>
                    </Col>
                    <div>
                        {this.renderRedirect()}
                        <Button color="primary" > Edit LOG</Button>
                    </div>
                </Form>
            </Container>
        )
    }
}
