import {Link} from 'react-router-dom'

import './index.css'

const Logos = () => {
  console.log('hai')
  return (
    <div className="container1">
      <div className="responsive-container1">
        <h1 className="main-heading"> You Tell, I Do </h1>
        <div className="container2">
          <div className="logoContainer">
            <Link to="/teacherLogin">
              <button type="button" className="buttonStyle">
                <img
                  src="https://res.cloudinary.com/dnxboobjh/image/upload/v1678362109/teacher_xk7pam.jpg"
                  alt="teacher logo"
                  className="teacherImg"
                />
              </button>
            </Link>
            <h1 className="logo-heading"> Teacher </h1>
          </div>
          <div className="logoContainer">
            <Link to="/studentLogin">
              <button type="button" className="buttonStyle">
                <img
                  src="https://res.cloudinary.com/dnxboobjh/image/upload/v1678362131/student_f2mgeo.jpg"
                  alt="teacher logo"
                  className="studentImg"
                />
              </button>
            </Link>
            <h1 className="logo-heading"> Student </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Logos
