import React from 'react';

import Login from './components/login-user.component'
import { Route ,Switch} from 'react-router-dom';
import Register from './components/create-user.component'
import ExerciseList from './components/exercise-list.component';
import CreateExercise from './components/create-exercise.component';
import EditExercise from './components/edit-exercise.component';

function App() {
  return (  
    <div>
      <Switch>
      <Route path ="/" exact  component={Login}/>
     <Route path ="/login"  component={Login}/>
     <Route path ="/register"  component={Register}/>
     <Route path ="/exerciseTracker"  component={ExerciseList}/>
     <Route path ="/create"  component={CreateExercise}/>
     <Route path ="/edit/:id"  component={EditExercise}/>


     </Switch>
</div>
  );
}

export default App;
