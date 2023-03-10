import './index.css'

const AskedQuestions = props => {
  const {askedQuestion} = props
  const {q1, a1} = askedQuestion
  return (
    <li className="orderList">
      <div className="orderContainer">
        <p>{q1} </p>
        <p> {a1}</p>
      </div>
    </li>
  )
}

export default AskedQuestions
