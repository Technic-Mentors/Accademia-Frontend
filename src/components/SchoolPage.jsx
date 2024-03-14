import React, { useState, useContext } from "react";
import frontendDeveloper from '../img/front-end-developer-course.avif'
import { Link } from "react-router-dom";
import MyContext from "../contexts/Mycontexts";

export default function SchoolPage() {
  const { allSchool } = useContext(MyContext)

  const [searchName, setSearchName] = useState("")
  const [searchCity, setSearchCity] = useState("")
  const [searchCategory, setSearchCategory] = useState("")

  return (
    <div>
      {/* {/ header start /} */}
      <section>
        <div className="head-bg">
          <div className="head-overlay">
            <h1 className="text-center text-white py-7">Schools</h1>
          </div>
        </div>
      </section>
      {/* {/ header end /} */}

      { /*search options start*/}
      <div className="container">
        <div className="row find">
          <div className="col-md-4 mt-4">
            <input
              type="text"
              className="form-control schoo-search"
              placeholder="Search By Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <div className="col-md-4 mt-4">
            <input
              type="text"
              className="form-control schoo-search"
              placeholder="Search By City"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            />
          </div>
          <div className="col-md-4 mt-4">
            <select className="form-control" name="" id="" value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} style={{ backgroundColor: "white" }}>
              <option value="">Search By Category</option>
              <option >Private</option>
              <option >Public</option>
            </select>
          </div>
        </div>
      </div>
      { /*search options end*/}
      <div className="container pb-3">
        <div className="row">
          {allSchool &&
            allSchool.filter(school => school.status === "Approved").filter(school => school.name.toLowerCase().includes(searchName.toLowerCase()))
              .filter(school => school.city.toLowerCase().includes(searchCity.toLowerCase()))
              .filter(school => school.category.toLowerCase().includes(searchCategory.toLowerCase())).map((School) => {
                return (
                  <div className="col-md-4 mt-4" key={School._id}>
                    <Link to={`/school-details/${School.name.replace(/ /g, '-')}`}>  <div className="card school-card">
                      <div className="school-img">
                        <img src={School.image ? School.image : frontendDeveloper} alt="" className="img-fluid" style={{ width: "100%", height: "200px" }} />
                      </div>
                      <div className="school-content">
                        <h3>{School.name.length > 20 ? School.name.slice(0, 20) + "..." : School.name}</h3>
                        <p><b>Address:</b>&nbsp;{School.address.length > 30 ? School.address.slice(0, 30) + "..." : School.address}</p>
                        <p><b>Contact:</b>&nbsp;{School.number}</p>
                        <div className="school-bottom">
                          <hr />
                          <span className="city float-start">{School.city}</span>
                          <span className="category float-end">{School.category}</span>
                        </div>
                      </div>
                    </div>
                    </Link>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
