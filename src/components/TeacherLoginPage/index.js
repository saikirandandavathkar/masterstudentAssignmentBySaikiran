import {Component} from 'react'

import {Link} from 'react-router-dom'

import './index.css'

class TeacherLoginPage extends Component {
  state = {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    isItShow: false,
  }

  onChangeUsername = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  toLogin = event => {
    event.preventDefault()
    const {email, password} = this.state
  }

  onClickShow = event => {
    this.setState(prevState => ({isItShow: !prevState.isItShow}))
  }

  render() {
    const {emailError, passwordError, email, password, isItShow} = this.state
    const showedPasswordText = isItShow ? 'Password showed' : 'Show password'
    const checkElType = isItShow ? 'text' : 'password'
    return (
      <div className="container">
        <div className="responsive-container">
          <h1 className="teacher-heading-page"> Master Login Page </h1>
          <form className="loginCard" onSubmit={this.toLogin}>
            <h1 className="heading-teacher"> Login </h1>
            <div className="login-input-container">
              <label className="user-label" htmlFor="username">
                Email
              </label>
              <input
                type="text"
                className="userInput"
                id="username"
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
                value={email}
              />
              <p>{emailError}</p>
            </div>
            <div>
              <label className="user-label" htmlFor="password">
                {' '}
                Password
              </label>
              <input
                type={checkElType}
                className="userInput"
                id="password"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                value={password}
              />
              <div className="showPasswordContainer">
                <p className="error">{passwordError}</p>
                <div className="checkboxContainer">
                  <input
                    type="checkbox"
                    id="showPassword"
                    className="checkBoxStyle"
                    onClick={this.onClickShow}
                    value={isItShow}
                  />
                  <label htmlFor="showPassword" className="showpassHeading">
                    {showedPasswordText}
                  </label>
                </div>
              </div>
            </div>
            <button type="submit" className="loginButton">
              {' '}
              Login
            </button>
            <div className="linkContainer">
              <p> Doesn't have an account yet? </p>
              <Link to="teacherRegistration">
                <p className="signUp"> Sign up </p>
              </Link>
            </div>
          </form>
          <Link to="/">
            <button type="button" className="backButton">
              {' '}
              Home{' '}
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default TeacherLoginPage
