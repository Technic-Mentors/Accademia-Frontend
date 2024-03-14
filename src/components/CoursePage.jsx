import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import frontendDeveloper from "../img/front-end-developer-course.avif";
import MyContext from "../contexts/Mycontexts";

export default function CoursePage() {
  const { allCourse, setCourseDataId } = useContext(MyContext)
  const [category, setCategory] = useState([])

  const [searchName, setSearchName] = useState("")
  const [searchCategory, setSearchCategory] = useState("")

  const getCategory = async () => {
    const res = await fetch('https://accademia-backend.vercel.app/api/auth/getcategory', {
      method: 'GET'
    })
    const data = await res.json()
    setCategory(data)
  }
  useEffect(() => {
    getCategory()
  }, [])
  return (
    <div>
      {/* {/ header start /} */}
      <section>
        <div className="head-bg">
          <div className="head-overlay">
            <h1 className="text-center text-white py-7">Courses</h1>
          </div>
        </div>
      </section>
      {/* {/ header end /} */}

      <section className="courses-section py-4 bg-white">
        <div className="container">
          <div className="section-header text-center mb-4">
            <h6>Select Courses</h6>
            <h2>Explore Our Popular Courses</h2>
          </div>

          <div className="container mb-4">
            <div className="row find d-flex justify-content-between">
              <div className="col-md-4 mt-4">
                <input
                  type="text"
                  className="form-control schoo-search"
                  placeholder="Search By Title"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>

              <div className="col-md-4 mt-4">
                <select className="form-control" name="" id="" value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} style={{ backgroundColor: "white" }}>
                  <option value="">Search By Category</option>
                  {category && category.map((cat) => {
                    return <option value={cat._id}>{cat.category}</option>
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {allCourse && allCourse.filter(course => course.title.toLowerCase().includes(searchName.toLowerCase()))
              .filter(course => course.categoryId.includes(searchCategory))
              .map((data) => {
                return <div className="col-md-4">
                  <div className="card courses">
                    <div className="course-content">
                      <img src={data.image ? data.image : frontendDeveloper} alt="" className="img-fluid" style={{ height: "200px", width: "100%" }} />
                    </div>
                    <div className="course-title p-4">
                      <h3>{data.title.length >35 ?data.title.slice(0, 35) + "..." : data.title}</h3>
                      <hr />
                      <p>
                        Duration: <b>{data.duration}</b>
                      </p>
                    </div>
                    <div className="join mb-2">
                      <Link to={`/course-details/${data.title.replace(/ /g, '-')}`}>
                        <button className="first-button">View Contents</button>
                      </Link>
                      <Link to="/signin" onClick={() => setCourseDataId(data._id)}>
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
  )
}