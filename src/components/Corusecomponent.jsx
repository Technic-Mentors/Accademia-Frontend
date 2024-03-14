import React, {useContext} from "react";
import frontendDeveloper from "../img/front-end-developer-course.avif";
import { Link } from "react-router-dom";
import MyContext from "../contexts/Mycontexts";


function Corusecomponent() {
  const { allCourse } = useContext(MyContext)
  return (
    <div>
      <section className="courses-section py-4 bg-white">
        <div className="container">
            <div className="section-header text-center mb-4">
                <h6>Select Courses</h6>
                <h2>Explore Our Popular Courses</h2>
            </div>
          <div className="row g-4">
            {allCourse && allCourse.slice(-6).map((course) =>{
              return  <div className="col-md-4" key={course._id}>
              <div className="card courses">
                <div className="course-content">
                  <img src={course.image ? course.image : frontendDeveloper} alt="" className="img-fluid" style={{height: '200px', width: '100%'}}/>
                </div>
                <div className="course-title p-4">
                  <h3>{course.title.length>25 ? course.title.slice(0,25)+"...":course.title}</h3>
                  <hr />
                  <p>
                    Duration: <b>{course.duration}</b>
                  </p>
                </div>
                <div className="join mb-2">
                  <Link to={`/course-details/${course.title.replace(/ /g,'-')}`}>
                    <button className="first-button">View Contents</button>
                  </Link>
                  <Link to='/signin'>
                    <button className="second-button float-end">
                      Enroll Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            })}
           

            

           

          </div>

          
        </div>
      </section>
    </div>
  );
}

export default Corusecomponent;
