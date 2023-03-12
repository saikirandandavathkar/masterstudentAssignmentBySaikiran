import {Component} from 'react'

import {Link} from 'react-router-dom'

import './index.css'

class TeacherLoginPage extends Component {
  state = {
    email: '',
    password: '',
    emailError: false,
    passwordError: false,
    isItShow: false,
  }

  getListFromLocalStorage = () => {
    const stringifiedList = localStorage.getItem('teacherSignUpList345')

    const parsedList = JSON.parse(stringifiedList)
    console.log(parsedList)
    if (parsedList === null) {
      return []
    }
    return parsedList
  }

  onChangeUsername = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  goToTaskExecutorPage = () => {
    const {history} = this.props
    history.replace('/taskExecutor')
  }

  toLogin = event => {
    event.preventDefault()
    const {email, password} = this.state
    const parsedList = this.getListFromLocalStorage()

    const emailMatched = parsedList.some(eachList => eachList.email === email)
    const passwordMatched = parsedList.some(
      eachList => eachList.password === password,
    )

    console.log(emailMatched)
    console.log(passwordMatched)

    if (emailMatched === false && passwordMatched === false) {
      this.setState({
        emailError: true,
        passwordError: true,
        email: '',
        password: '',
      })
    } else if (emailMatched === true && passwordMatched === false) {
      this.setState({
        emailError: false,
        passwordError: true,
        password: '',
      })
    } else if (emailMatched === false && passwordMatched === true) {
      this.setState({
        emailError: true,
        passwordError: true,
      })
    } else {
      this.setState(
        {
          emailError: false,
          passwordError: false,
          email: '',
          password: '',
        },
        this.goToTaskExecutorPage,
      )
    }
  }

  onClickShow = () => {
    this.setState(prevState => ({isItShow: !prevState.isItShow}))
  }

  render() {
    const {emailError, passwordError, email, password, isItShow} = this.state
    const showedPasswordText = isItShow ? 'Password showed' : 'Show password'
    const checkElType = isItShow ? 'text' : 'password'
    const emailErrorText = emailError ? '*Invalid email' : ''
    const passwordErrorText = passwordError ? '*Invalid password' : ''
    return (
      <div className="container">
        <div className="responsive-container">
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
                placeholder="Enter Email"
                onChange={this.onChangeUsername}
                value={email}
              />
              <p className="error">{emailErrorText}</p>
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
                <p className="error">{passwordErrorText}</p>
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
              <p className="haveAnAccount"> Does not have an account yet? </p>
              <Link to="teacherRegistration">
                <p className="signUp"> Sign up </p>
              </Link>
            </div>
          </form>
          <Link to="/">
            <button type="button" className="backButton34">
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
