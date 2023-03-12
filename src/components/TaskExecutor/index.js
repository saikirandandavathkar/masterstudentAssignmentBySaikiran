import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {v4 as uuidV4} from 'uuid'

import DisplayQuestions from '../DisplayQuestions'

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
    questionsList: [],
    isSubmit: false,
  }

  componentDidMount() {
    this.listUpdated()
  }

  listUpdated = () => {
    const {questionsList} = this.state
    const parsedList = this.getListFromLocalStorage()
    const value = questionsList.length === 0
    if (value) {
      this.setState({questionsList: parsedList, isSubmit: true})
    }
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
    const stringifiedList = localStorage.getItem('arithmeticOperations345')

    const parsedList = JSON.parse(stringifiedList)

    if (parsedList === null) {
      return []
    }
    return parsedList
  }

  addOperationInQuestionList = () => {
    const {question, answer, questionsList} = this.state

    if (answer !== '') {
      const newObj = {
        id: uuidV4(),
        question,
        answer,
        studentAns: '',
        valueAdded: false,
        validDigit: true,
      }

      let modifiedList = ''

      if (questionsList.length !== 0) {
        modifiedList = questionsList.map(eachList => ({
          ...eachList,
          studentAns: '',
          valueAdded: false,
        }))
      } else {
        modifiedList = questionsList
      }

      const updatedList = [...modifiedList, newObj]

      // console.log(updatedList)

      console.log(updatedList)

      const formDetails = {
        answerFormSubmitted: false,
        questionFormsubmitted: false,
      }

      localStorage.setItem('formsSubmissions', JSON.stringify(formDetails))

      this.setState({
        question: '',
        answer: '',
        questionsList: updatedList,
        isSubmit: false,
      })
    }
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

    this.setState({answer: isAnswer}, this.addOperationInQuestionList)
  }

  isItValidQuestion = question => {
    if (question.endsWith('()))')) {
      const withoutLeftParenthesis = question.split('(')
      if (withoutLeftParenthesis.length > 1) {
        const operandFirst = withoutLeftParenthesis[0].toLowerCase()
        const operandSecond = withoutLeftParenthesis[2].toLowerCase()
        const userOperator = withoutLeftParenthesis[1].toLowerCase()

        // console.log(userOperator)
        // console.log(operandFirst)
        // console.log(operandSecond)

        const operatorValid = this.checkOperator(userOperator)
        const operandFirstValid = this.checkOperands(operandFirst)
        const operandSecondValid = this.checkOperands(operandSecond)

        // console.log(operatorValid)
        // console.log(operandFirstValid)
        // console.log(operandSecondValid)

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
    history.replace('/')
  }

  submitQuestions = () => {
    const {questionsList} = this.state
    localStorage.setItem(
      'arithmeticOperations345',
      JSON.stringify(questionsList),
    )

    const formDetails = {
      answerFormSubmitted: false,
      questionFormsubmitted: true,
    }

    localStorage.setItem('formsSubmissions', JSON.stringify(formDetails))

    this.setState({isSubmit: true})
  }

  onRemoveItem = id => {
    const {questionsList} = this.state
    const filteredList = questionsList.filter(eachList => eachList.id !== id)

    if (filteredList.length === 0) {
      localStorage.removeItem('arithmeticOperations345')
    }

    this.setState({questionsList: filteredList, isSubmit: false})
  }

  clearQuestions = () => {
    localStorage.removeItem('arithmeticOperations345')
    this.setState({questionsList: []})
  }

  renderQuestions = () => {
    // const parsedList = this.getListFromLocalStorage()

    // console.log(parsedList)

    const {questionsList, isSubmit} = this.state

    // const updatedList = questionsList.length === 0 ? parsedList : questionsList

    const submitText = isSubmit ? 'Submitted' : 'Submit'

    // const value = localStorage.getItem('studentAns54')
    // const parsedValue = JSON.parse(value)
    // const studentAnsValue = parsedValue === null ? false : parsedValue

    const value = localStorage.getItem('formsSubmissions')
    const parsedValue = JSON.parse(value)
    const studentAnsValue =
      parsedValue === null ? false : parsedValue.answerFormSubmitted

    const studentAnswers = studentAnsValue ? 'Student Answers' : ''
    const CorrectAnswers = studentAnsValue ? 'Correct Answers' : ''
    const QuestionTxt =
      parsedValue.answerFormSubmitted === true
        ? 'Questions & Answers'
        : 'Questions'
    return (
      <>
        <h1 className="questionsHeading"> {QuestionTxt} </h1>
        <ol className="question-container2">
          <div className="activityList">
            <p className="questionHead34 questionHeadOne"> Questions </p>
            <p className="questionHead34 questionHeadTwo"> {studentAnswers} </p>
            <p className="questionHead34"> {CorrectAnswers} </p>
          </div>
          {questionsList.map(eachQuestion => (
            <DisplayQuestions
              key="eachQuestion.id"
              questionDetails={eachQuestion}
              onRemoveItem={this.onRemoveItem}
            />
          ))}
        </ol>
        <div className="clearContainer">
          <div className="hintContainer">
            <p className="hintStyle">Hint:</p>
            <p className="hintStyle hintStyle2">
              1.NA: Not answered by student
            </p>
            <p className="hintStyle hintStyle2">2.Null: Null value</p>
            <p className="hintStyle hintStyle2">
              3.once you clear the questions and you are not able to get back
            </p>
            <p className="hintStyle hintStyle2">
              4.Student Answers and Correct Answers will be shown after student
              submitted answers
            </p>
          </div>
          <button
            className="submitButton3"
            type="button"
            onClick={this.clearQuestions}
          >
            Clear
          </button>
        </div>
        <button
          className="submitButton3"
          type="button"
          onClick={this.submitQuestions}
        >
          {submitText}
        </button>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {question, validQuestion, questionsList} = this.state
    const errorText = validQuestion ? '' : '*enter valid Question'

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
            <button className="calculateButton2" type="submit">
              Add
            </button>
          </form>
          {questionsList.length === 0 ? null : this.renderQuestions()}
        </div>
      </div>
    )
  }
}

export default TaskExecutor
