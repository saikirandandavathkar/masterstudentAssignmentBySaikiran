import {Component} from 'react'

import {Link} from 'react-router-dom'

import './index.css'

class TeacherRegistration extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userDetailsList: [],
    isItMatched: true,
    isEmailValid: true,
    isItEmail: true,
    isItname: true,
    isItPassword: true,
    isItSuccess: false,
  }

  getListFromLocalStorage = () => {
    const stringifiedList = localStorage.getItem('teacherSignUpList')

    const parsedList = JSON.parse(stringifiedList)

    if (parsedList === null) {
      return []
    }
    return parsedList
  }

  addDataInList = () => {
    const {name, email, password} = this.state

    const parsedList = this.getListFromLocalStorage()

    const listId = parsedList.length

    const newObj = {id: listId + 1, name, email, password}

    const sameSignUpDetails = parsedList.some(
      eachList => eachList.email === email,
    )

    if (sameSignUpDetails === false) {
      const updatedList = [...parsedList, newObj]
      localStorage.setItem('teacherSignUpList', JSON.stringify(updatedList))
      this.setState({
        isItSuccess: true,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    } else {
      console.log('hai')
      this.setState({
        isItEmail: false,
        name: '',
        password: '',
        email: '',
        confirmPassword: '',
      })
    }
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeConfirmPassword = event => {
    this.setState({confirmPassword: event.target.value})
  }

  toSignUp = event => {
    event.preventDefault()
    const {name, email, password, confirmPassword} = this.state
    if (name === '' && email === '' && password === '') {
      this.setState({isItEmail: false, isItname: false, isItPassword: false})
    } else if (name !== '' && email !== '' && password !== '') {
      const writeEmail = email.endsWith('@gmail.com')
      const matchedPassword = password === confirmPassword
      if (writeEmail === true && matchedPassword === true) {
        this.setState(
          {
            isItEmail: true,
            isItname: true,
            isItPassword: true,
            isEmailValid: true,
            isItSuccess: false,
          },
          this.addDataInList,
        )
      } else if (writeEmail === true && matchedPassword === false) {
        this.setState({
          isItEmail: true,
          isItname: true,
          isItPassword: true,
          isEmailValid: true,
          isItMatched: false,
          isItSuccess: false,
        })
      } else if (writeEmail === false && matchedPassword === true) {
        this.setState({
          isItEmail: true,
          isItname: true,
          isItPassword: true,
          isEmailValid: false,
          isItMatched: true,
          isItSuccess: false,
        })
      } else if (writeEmail === false && matchedPassword === false) {
        this.setState({
          isItEmail: true,
          isItname: true,
          isItPassword: true,
          isEmailValid: false,
          isItMatched: false,
          isItSuccess: false,
        })
      }
    } else if (name === '' && email !== '' && password !== '') {
      const writeEmail = email.endsWith('@gmail.com')
      const matchedPassword = password === confirmPassword
      if (writeEmail === true && matchedPassword === true) {
        this.setState({
          isItEmail: true,
          isItname: false,
          isItPassword: true,
          isEmailValid: true,
          isItSuccess: false,
        })
      } else if (writeEmail === true && matchedPassword === false) {
        this.setState({
          isItEmail: true,
          isItname: false,
          isItPassword: true,
          isEmailValid: true,
          isItMatched: false,
          isItSuccess: false,
        })
      } else if (writeEmail === false && matchedPassword === true) {
        this.setState({
          isItEmail: true,
          isItname: false,
          isItPassword: true,
          isEmailValid: false,
          isItMatched: true,
          isItSuccess: false,
        })
      } else if (writeEmail === false && matchedPassword === false) {
        this.setState({
          isItEmail: true,
          isItname: false,
          isItPassword: true,
          isEmailValid: false,
          isItMatched: false,
          isItSuccess: false,
        })
      }
    } else if (name === '' && email === '' && password !== '') {
      const matchedPassword = password === confirmPassword
      if (matchedPassword) {
        this.setState({
          isItEmail: false,
          isItname: false,
          isItPassword: true,
          isEmailValid: true,
          isItMatched: true,
          isItSuccess: false,
        })
      } else {
        this.setState({
          isItEmail: false,
          isItname: false,
          isItPassword: true,
          isEmailValid: true,
          isItMatched: false,
          isItSuccess: false,
        })
      }
    } else if (name === '' && email !== '' && password === '') {
      const writeEmail = email.endsWith('@gmail.com')
      if (writeEmail) {
        this.setState({
          isItEmail: true,
          isItname: false,
          isItPassword: false,
          isEmailValid: true,
          isItSuccess: false,
        })
      } else {
        this.setState({
          isItEmail: true,
          isItname: false,
          isItPassword: false,
          isEmailValid: false,
          isItSuccess: false,
        })
      }
    } else if (name !== '' && email === '' && password === '') {
      this.setState({
        isItEmail: false,
        isItname: true,
        isItPassword: false,
        isItMatched: true,
        isEmailValid: true,
        isItSuccess: false,
      })
    } else if (name !== '' && email === '' && password !== '') {
      const matchedPassword = password === confirmPassword
      if (matchedPassword) {
        this.setState({
          isItEmail: false,
          isItname: true,
          isItPassword: true,
          isItMatched: true,
          isEmailValid: true,
          isItSuccess: false,
        })
      } else {
        this.setState({
          isItEmail: false,
          isItname: true,
          isItPassword: true,
          isItMatched: false,
          isEmailValid: true,
          isItSuccess: false,
        })
      }
    } else if (name !== '' && email !== '' && password === '') {
      const writeEmail = email.endsWith('@gmail.com')
      if (writeEmail) {
        this.setState({
          isItEmail: true,
          isItname: true,
          isItPassword: false,
          isItMatched: true,
          isEmailValid: true,
          isItSuccess: false,
        })
      } else {
        this.setState({
          isItEmail: true,
          isItname: true,
          isItPassword: false,
          isItMatched: true,
          isEmailValid: false,
          isItSuccess: false,
        })
      }
    }
  }

  render() {
    const {
      name,
      email,
      password,
      confirmPassword,
      isItMatched,
      isEmailValid,
      isItname,
      isItEmail,
      isItPassword,
      userDetailsList,
      isItSuccess,
    } = this.state

    console.log(userDetailsList)

    const successText = isItSuccess
      ? 'Your account has been successfully created'
      : ''

    const passwordError = isItMatched ? '' : '*Password Not Matched'
    const invalidEmail = isEmailValid
      ? ''
      : '*password must end with @gmail.com'
    const nameError = isItname ? '' : '*Enter Valild Name'
    const emailError = isItEmail ? '' : '*Enter Valild Email'
    const invalidPasssword = isItPassword ? '' : '*Enter Valid Password'
    return (
      <div className="container">
        <div className="responsive-container">
          <form className="loginCard" onSubmit={this.toSignUp}>
            <h1 className="heading-teacher"> Sign Up by Master </h1>
            <div className="login-input-container">
              <input
                type="text"
                className="userInput"
                placeholder="Enter Name"
                onChange={this.onChangeName}
                value={name}
              />
            </div>
            <p className="error">{nameError}</p>
            <div className="login-input-container">
              <input
                type="text"
                className="userInput"
                placeholder="Enter Email"
                onChange={this.onChangeEmail}
                value={email}
              />
            </div>
            <p className="error">{emailError}</p>
            <p className="error">{invalidEmail}</p>
            <div className="login-input-container">
              <input
                type="password"
                className="userInput"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <p className="error">{invalidPasssword}</p>
            <div className="login-input-container">
              <input
                type="password"
                className="userInput"
                placeholder="Confirm Password"
                onChange={this.onChangeConfirmPassword}
                value={confirmPassword}
              />
            </div>
            <p className="error">{passwordError}</p>
            <button type="submit" className="loginButton">
              Sign Up
            </button>
            <p className="succcess">{successText}</p>
          </form>
          <div>
            <Link to="/teacherLogin">
              <button type="button" className="backButton">
                {' '}
                Back{' '}
              </button>
            </Link>
            <Link to="/">
              <button type="button" className="backButton">
                {' '}
                Home{' '}
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default TeacherRegistration
