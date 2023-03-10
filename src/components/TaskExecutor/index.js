import {Component} from 'react'

import {v4 as uuidV4} from 'uuid'

import './index.css'

const operatorList = [
  {id: 1, symbol: 'plus'},
  {id: 2, symbol: 'minus'},
  {id: 3, symbol: 'times'},
  {id: 4, symbol: 'divided_by'},
]
const operandList = [
  {id: 1, number: 'zero', digit: 0},
  {id: 2, number: 'one', digit: 1},
  {id: 3, number: 'two', digit: 2},
  {id: 4, number: 'three', digit: 3},
  {id: 5, number: 'four', digit: 4},
  {id: 6, number: 'five', digit: 5},
  {id: 7, number: 'six', digit: 6},
  {id: 8, number: 'seven', digit: 7},
  {id: 9, number: 'eight', digit: 8},
  {id: 10, number: 'nine', digit: 9},
]

class TaskExecutor extends Component {
  state = {
    question: '',
    answer: '',
    operand1: '',
    operand2: '',
    operator: '',
    validQuestion: true,
  }

  checkOperator = userOperator => {
    const value = operatorList.some(
      eachList => eachList.symbol === userOperator,
    )
    return value
  }

  checkOperands = operand => {
    const value = operandList.some(eachList => eachList.number === operand)
    return value
  }

  getListFromLocalStorage = () => {
    const stringifiedList = localStorage.getItem('arithmeticOperations')

    const parsedList = JSON.parse(stringifiedList)

    if (parsedList === null) {
      return []
    }
    return parsedList
  }

  addOperationInLocalStorage = () => {
    const {question, answer} = this.state
    const parsedList = this.getListFromLocalStorage()
    console.log(parsedList)
    const newObj = {id: uuidV4(), question, answer}

    const updatedList = [...parsedList, newObj]

    localStorage.setItem('arithmeticOperations', JSON.stringify(updatedList))
    this.setState({question: '', answer: ''})
  }

  calculateTheFunction = () => {
    const {operator, operand1, operand2} = this.state
    const digit1List = operandList.filter(
      eachList => eachList.number === operand1,
    )
    const digit1 = digit1List[0].digit
    const digit2List = operandList.filter(
      eachList => eachList.number === operand2,
    )
    const digit2 = digit2List[0].digit
    console.log(digit1)
    console.log(digit2)
    let isAnswer
    switch (operator) {
      case 'plus':
        isAnswer = digit1 + digit2
        break
      case 'minus':
        isAnswer = digit1 - digit2
        break
      case 'times':
        isAnswer = digit1 * digit2
        break
      default:
        isAnswer = Math.floor(digit1 / digit2)
        break
    }

    this.setState({answer: isAnswer})
  }

  isItValidQuestion = question => {
    if (question.endsWith('()))')) {
      const withoutRightParenthesis = question.split(')')
      const withoutLeftParenthesis = question.split('(')
      if (withoutLeftParenthesis.length > 1) {
        const operandFirst = withoutLeftParenthesis[0].toLowerCase()
        const operandSecond = withoutLeftParenthesis[2].toLowerCase()
        const userOperator = withoutLeftParenthesis[1].toLowerCase()

        console.log(userOperator)
        console.log(operandFirst)
        console.log(operandSecond)

        const operatorValid = this.checkOperator(userOperator)
        const operandFirstValid = this.checkOperands(operandFirst)
        const operandSecondValid = this.checkOperands(operandSecond)

        console.log(operatorValid)
        console.log(operandFirstValid)
        console.log(operandSecondValid)

        if (
          operatorValid === true &&
          operandFirstValid === true &&
          operandSecondValid === true
        ) {
          console.log('Hai')
          this.setState(
            {
              validQuestion: true,
              operator: userOperator,
              operand1: operandFirst,
              operand2: operandSecond,
            },
            this.calculateTheFunction,
          )
        } else {
          console.log('one false')
          this.setState({validQuestion: false, answer: ''})
        }
      } else {
        console.log('how are you')
        this.setState({validQuestion: false, answer: ''})
      }
    } else {
      this.setState({validQuestion: false, answer: ''})
    }
  }

  onChangeQuestion = event => {
    this.setState({question: event.target.value, answer: ''})
  }

  onSubmitQuestions = event => {
    event.preventDefault()
    const {question} = this.state
    this.isItValidQuestion(question)
  }

  onLogoutButton = () => {
    const {history} = this.props
    history.replace('/teacherLogin')
  }

  render() {
    const {question, answer, validQuestion} = this.state
    const errorText = validQuestion ? '' : '*enter valid Question'

    const askedQuestion = answer === '' ? '' : {q1: question, a1: answer}
    return (
      <div className="execute-container">
        <div className="responsive-container2">
          <button
            className="logoutButton567"
            type="button"
            onClick={this.onLogoutButton}
          >
            Log out
          </button>
          <h1 className="executor-heading"> Calculations </h1>
          <form
            className="question-container"
            onSubmit={this.onSubmitQuestions}
          >
            <h1 className="question-container-heading">
              Enter
              <span className="span-heading">Question</span>
            </h1>
            <input
              type="text"
              className="question-input"
              value={question}
              onChange={this.onChangeQuestion}
              placeholder="Eg: two(times(three()))"
            />
            <p className="error2"> {errorText} </p>
            <button className="calculateButton" type="submit">
              Get
            </button>
            <h1 className="question-container-heading">Answer</h1>
            <p className="answer-para"> {answer} </p>
          </form>
          <button
            className="calculateButton2"
            type="submit"
            onClick={this.addOperationInLocalStorage}
          >
            Add
          </button>
        </div>
      </div>
    )
  }
}

export default TaskExecutor
