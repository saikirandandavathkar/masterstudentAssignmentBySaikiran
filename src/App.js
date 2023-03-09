import {BrowserRouter, Route, Switch} from 'react-router-dom'

import TeacherLoginPage from './components/TeacherLoginPage'
import TeacherRegistration from './components/TeacherRegistration'
import StudentLogin from './components/StudentLogin'
import StudentRegistration from './components/StudentRegistration'

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
    </Switch>
  </BrowserRouter>
)

export default App
