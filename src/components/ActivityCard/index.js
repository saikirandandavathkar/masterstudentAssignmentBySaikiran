import './index.css'

const ActivityCard = props => {
  const {listDetails, getDigit, addedValue} = props
  const {question, id, valueAdded, studentAns, validDigit} = listDetails

  const getSubmitFormLocalStorage = () => {
    const stringifiedForm = localStorage.getItem('formsSubmissions')

    const parseForm = JSON.parse(stringifiedForm)

    if (parseForm === null) {
      return false
    }
    return parseForm.answerFormSubmitted
  }

  const isItSubmit = getSubmitFormLocalStorage()

  const onChangeDigit = event => {
    if (isItSubmit === false) {
      getDigit(event.target.value.toLowerCase(), id)
    }
  }

  const addDigit = () => {
    if (isItSubmit === false) {
      addedValue(id)
    }
  }

  const buttonColor = valueAdded ? 'color2' : 'color1'

  const opacityColor = isItSubmit ? 'opacityStyle' : null

  return (
    <li className="list">
      <div>
        <div className="activityList">
          <p className="question"> {question} </p>
          <div>
            <input
              type="text"
              className={`inputEl ${opacityColor}`}
              onChange={onChangeDigit}
              value={studentAns}
            />
            <button
              type="button"
              className={`addButton ${buttonColor} ${opacityColor}`}
              onClick={addDigit}
            >
              {valueAdded ? 'Added' : 'Add'}
            </button>
          </div>
        </div>
        {validDigit ? null : <p className="invalidChar">*invalid input</p>}
      </div>
    </li>
  )
}

export default ActivityCard
