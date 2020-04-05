import React , {Component} from 'react';
import {   Container, Col, Form,FormGroup, Label, Input,Button, } from 'reactstrap';
import Navbar from './navbar.component'
import './create-exercise.css'
export default class CreateExercise extends Component {

    constructor(props){
        super(props);
        this.state={
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };
    render() {
        return(

            <Container className="App container">
            <Navbar />
            <h2 className="login_header">Create Exercise LOG</h2>
            <Form className="form form_box">            
              <Col>
                <FormGroup>
                  <Label>User Name</Label>
                  <Input
                  onChange={this.onChange}
                  value={this.state.username}
                //   error={errors.user_name}
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
                  <Input
                  onChange={this.onChange}
                  value={this.state.date}
                //   error={errors.password}
                    type="Date"
                    name="date"
                    id="date"
                    placeholder="YYYY-MM-DD"
                  />
                </FormGroup>
              </Col>
         
              <Button>Create LOG</Button>
              {/* <p className="question">Already have an account? <Link to="/login">Log in</Link></p> */}
            
            </Form>
          </Container>
        )
      }

}