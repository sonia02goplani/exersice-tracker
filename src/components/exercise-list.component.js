import React, { Component } from 'react';
import Navbar from './navbar.component'
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td><Link to={"/edit/" + props.exercise._id}>Edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</a></td>
    </tr>
)
export default class ExerciseList extends Component {
    constructor(props) {
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.state = {
            exercises: [],
            userid: localStorage.getItem('UserID'),
            username: localStorage.getItem('UserName'),
            isLoggedIn: localStorage.getItem('isLoggedIn')

        }
    }
    componentDidMount() {
        axios.post('http://localhost:5000/exercises/userExercise', { userid: this.state.userid, username: this.state.username })
            .then(result => {
                console.log("result" + result.data)
                if (result.data.length > 0) {
                    this.setState({ exercises: result.data });
                    console.log(this.state.exercises)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    };
    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(res => console.log(res.data))
        this.setState({
            exercises: this.state.exercises.filter(ex => ex._id !== id)
        })

    }
    exercisesList() {
        if (this.state.exercises.length > 0) {
            return this.state.exercises.map(currentExercise => {
                return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id} />
            })
        }
        else {
            return "No Logs Found"
        }


    }
    render() {
        return (
            <div>
                <Navbar />
                <h3>Logged Exercises</h3>
                <table className="table">

                    <thead className="thead-light">
                        <tr>
                            <th>UserName</th>
                            <th>Description</th>
                            <th>Duration(in Minutes)</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exercisesList()}
                    </tbody>
                </table>
            </div>
        )
    }

}