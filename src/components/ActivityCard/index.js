import './index.css'

const ActivityCard = props => {
  const {listDetails} = props
  const {question, answer} = listDetails
  return (
    <li className="list">
      <div className="activityList">
        <p className="question"> {question} </p>
        <p className="question"> {answer} </p>
      </div>
    </li>
  )
}

export default ActivityCard
