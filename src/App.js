import {BrowserRouter, Route, Switch} from 'react-router-dom'

import TeacherLoginPage from './components/TeacherLoginPage'
import TeacherRegistration from './components/TeacherRegistration'
import StudentLogin from './components/StudentLogin'
import StudentRegistration from './components/StudentRegistration'
import TaskExecutor from './components/TaskExecutor'
import StudentActivity from './components/StudentActivity'

import Logos from './components/Logos'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Logos} />
      <Route exact path="/teacherLogin" component={TeacherLoginPage} />
      <Route
        exact
        path="/teacherRegistration"
        component={TeacherRegistration}
      />
      <Route exact path="/studentLogin" component={StudentLogin} />
      <Route
        exact
        path="/studentRegistration"
        component={StudentRegistration}
      />
      <Route exact path="/taskExecutor" component={TaskExecutor} />
      <Route exact path="/studentActivity" component={StudentActivity} />
    </Switch>
  </BrowserRouter>
)

export default App
