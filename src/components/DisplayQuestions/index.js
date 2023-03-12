import {AiOutlineDelete} from 'react-icons/ai'

import './index.css'

const DisplayQuestions = props => {
  const {questionDetails, onRemoveItem} = props
  const {question, id, studentAns, answer} = questionDetails

  const value = localStorage.getItem('formsSubmissions')
  const parsedValue = JSON.parse(value)
  const studentAnsValue =
    parsedValue === null ? false : parsedValue.answerFormSubmitted

  const studentQuesValue =
    parsedValue === null ? false : parsedValue.questionFormsubmitted

  let studentValue

  const answerText = answer === null ? 'null' : answer

  const correctValue = studentAnsValue ? answerText : ''

  console.log(correctValue)

  const onDeleteItem = () => {
    onRemoveItem(id)
  }

  if (studentQuesValue === true && studentAnsValue === true) {
    studentValue = studentAns !== '' ? studentAns : 'NA'
  } else {
    studentValue = ''
  }

  if (studentValue.length > 1) {
    if (studentValue[0] === '0') {
      studentValue = studentValue.slice(1)
    }
  }

  return (
    <li className="list">
      <div className="activityList">
        <p className="question1"> {question} </p>
        <p className="question2"> {studentValue}</p>
        <p className="question3"> {correctValue} </p>
        {parsedValue.answerFormSubmitted !== true ? (
          <button type="button" className="removeButton" onClick={onDeleteItem}>
            <AiOutlineDelete className="deleteIcon" />
          </button>
        ) : null}
      </div>
    </li>
  )
}

export default DisplayQuestions
