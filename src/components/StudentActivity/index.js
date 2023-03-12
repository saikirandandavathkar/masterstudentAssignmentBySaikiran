import {Component} from 'react'

import ActivityCard from '../ActivityCard'

import './index.css'

class StudentActivity extends Component {
  state = {questionsList: [], isSubmit: false, isItValidDigit: []}

  componentDidMount() {
    this.listUpdated()
  }

  getListFromLocalStorage = () => {
    const stringifiedList = localStorage.getItem('arithmeticOperations345')

    const parsedList = JSON.parse(stringifiedList)

    if (parsedList === null) {
      return []
    }
    return parsedList
  }

  getSubmitFormLocalStorage = () => {
    const stringifiedForm = localStorage.getItem('formsSubmissions')

    const parseForm = JSON.parse(stringifiedForm)

    if (parseForm === null) {
      return false
    }
    return parseForm.answerFormSubmitted
  }

  onLogoutButton = () => {
    const {history} = this.props
    history.replace('/')
  }

  listUpdated = () => {
    const {questionsList} = this.state
    const parsedList = this.getListFromLocalStorage()
    const submittedValue = this.getSubmitFormLocalStorage()
    const value = questionsList.length === 0
    if (value) {
      this.setState({questionsList: parsedList, isSubmit: submittedValue})
    }
  }

  getDigit = (digit, id) => {
    const {questionsList} = this.state

    console.log(questionsList)

    const updatedList = questionsList.map(eachList => {
      if (eachList.id === id) {
        if (digit !== '') {
          return {...eachList, studentAns: digit}
        }
        return {
          ...eachList,
          studentAns: '',
          valueAdded: false,
          validDigit: true,
        }
      }
      return eachList
    })
    console.log(updatedList)

    this.setState({questionsList: updatedList})
  }

  addedValue = id => {
    const {questionsList} = this.state

    const filteredList = questionsList.filter(eachList => eachList.id === id)

    console.log(filteredList)

    let output = filteredList[0].studentAns

    let valid
    if (output[0] === '-') {
      output = output.slice(1)
    }

    if (output.toLowerCase() === 'null') {
      valid = true
    } else {
      const outputList = output.split('')
      const digits = '0123456789'
      console.log(outputList)
      valid = outputList.every(eachChar => digits.includes(eachChar))
      console.log(valid)
    }

    if (valid) {
      const updatedList = questionsList.map(eachList => {
        if (eachList.id === id && eachList.studentAns !== '') {
          const value = !eachList.valueAdded
          if (value) {
            return {...eachList, valueAdded: value, validDigit: true}
          }
          return {...eachList, valueAdded: value, studentAns: ''}
        }
        return eachList
      })
      console.log(updatedList)
      this.setState({questionsList: updatedList})
    } else {
      const notValidList = questionsList.map(eachList => {
        if (eachList.id === id) {
          return {...eachList, validDigit: false}
        }
        return eachList
      })
      this.setState({questionsList: notValidList})
    }
  }

  onSubmitAns = () => {
    const {questionsList} = this.state

    const newUpdatedList = questionsList.map(eachList => {
      if (eachList.valueAdded === false) {
        return {...eachList, studentAns: ''}
      }
      return eachList
    })

    const againNewUpdatedList = newUpdatedList.map(eachList => {
      if (eachList.validDigit === false) {
        return {...eachList, validDigit: true}
      }
      return eachList
    })

    localStorage.setItem(
      'arithmeticOperations345',
      JSON.stringify(againNewUpdatedList),
    )

    const formDetails = {
      answerFormSubmitted: true,
      questionFormsubmitted: true,
    }

    localStorage.setItem('formsSubmissions', JSON.stringify(formDetails))

    this.setState({isSubmit: true, questionsList: againNewUpdatedList})
  }

  render() {
    const {questionsList, isSubmit, isItValidDigit} = this.state
    console.log(questionsList)
    return (
      <div className="container3">
        <div className="responsive-container3">
          <button
            className="logoutButton2"
            type="button"
            onClick={this.onLogoutButton}
          >
            Log out
          </button>
          <h1 className="activity-heading"> List of activities </h1>
          {questionsList.length === 0 ? (
            <h1 className="emptyList"> Empty Activity List </h1>
          ) : (
            <ol className="orderListContainer">
              <div className="activityList">
                <p className="questionHead"> Questions </p>
                <p className="questionHead"> Give answers </p>
              </div>
              {questionsList.map(eachList => (
                <ActivityCard
                  key={eachList.id}
                  listDetails={eachList}
                  getDigit={this.getDigit}
                  addedValue={this.addedValue}
                  isItValidDigit={isItValidDigit}
                />
              ))}
            </ol>
          )}
          {questionsList.length !== 0 ? (
            <div className="hintContainer23">
              <p className="hintStyle23">Hint:</p>
              <p className="hintStyle23 hintStyle235">
                1.you can mention Null or digits(123) only as input
              </p>
              <p className="hintStyle23 hintStyle235">
                2.do not forget to click on Add button after mentioning each
                value. otherwise value is not cosidered as an answer
              </p>
              <p className="hintStyle23 hintStyle235">
                3.once you submit file you can not edit the answers untill given
                new questions from Master
              </p>
            </div>
          ) : null}
          {questionsList.length === 0 ? null : (
            <button
              className="submitButton2"
              type="button"
              onClick={this.onSubmitAns}
            >
              {isSubmit ? 'Submitted' : 'Submit'}
            </button>
          )}
        </div>
      </div>
    )
  }
}

export default StudentActivity
