import {withRouter} from 'react-router-dom'

import ActivityCard from '../ActivityCard'

import './index.css'

const StudentActivity = props => {
  const getListFromLocalStorage = () => {
    const stringifiedList = localStorage.getItem('arithmeticOperations')

    const parsedList = JSON.parse(stringifiedList)

    if (parsedList === null) {
      return []
    }
    return parsedList
  }

  const onLogoutButton = () => {
    const {history} = props
    history.replace('/studentLogin')
  }

  const getList = getListFromLocalStorage()

  return (
    <div className="container3">
      <div className="responsive-container3">
        <button className="logoutButton" type="button" onClick={onLogoutButton}>
          Log out
        </button>
        <h1 className="activity-heading"> List of activities </h1>
        {getList.length === 0 ? (
          <h1 className="emptyList"> Empty List </h1>
        ) : (
          <ol className="orderListContainer">
            <div className="activityList">
              <p className="questionHead"> Questions </p>
              <p className="questionHead"> Answers </p>
            </div>
            {getList.map(eachList => (
              <ActivityCard key={eachList.id} listDetails={eachList} />
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}

export default withRouter(StudentActivity)
