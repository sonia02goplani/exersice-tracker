import React , {Component} from 'react';
import {   Container, Col, Form,FormGroup, Label, Input,Button, } from 'reactstrap';
import Navbar from './navbar.component'
import './create-exercise.css'
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';
import DatePicker from 'react-datepicker';
export default class CreateExercise extends Component {

    constructor(props){
        super(props);
        this.onChangeDate =this.onChangeDate.bind(this);
        this.state={
            username: localStorage.getItem('UserName'),
            userid: localStorage.getItem('UserID'),
            description: '',
            duration: 0,
            date: new Date(),
            isLoggedIn: localStorage.getItem('isLoggedIn'),
            isResultOK: false

        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };
onChangeDate(date)  {
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
        date: this.state.date
        };
        console.log(newLog);
        if(this.state.isLoggedIn){
        axios.post('http://localhost:5000/exercises/add' , newLog)
        .then(result =>{
            console.log("result" + result.data)
            if(result.data){
                this.setState({ isResultOK: true});
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
        return(

            <Container className="App container">
            <Navbar />
            <h2 className="login_header">Create Exercise LOG</h2>
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
                  <Label >Date</Label>
                  <DatePicker
      showPopperArrow={false}
      selected={this.state.date}
      onChange={this.onChangeDate}
                  />
                </FormGroup>
              </Col>        
              <div>
                  {this.renderRedirect()}
              <Button color="primary" > Create LOG</Button>
              </div>
            </Form>
          </Container>
        )
      }

}