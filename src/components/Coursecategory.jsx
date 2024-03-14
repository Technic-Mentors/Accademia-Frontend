import React from 'react'
import webDevelopment from '../img/we-development-course.avif'
import selfDevelopment from '../img/self-development-course.avif'
import graphicsDesign from '../img/graphics-design.avif'
import videoEditing from '../img/video-editing.avif'

function Coursecategory() {
  return (
    <div>
      <section className="category pb-3">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-12 mt-3">
                  <div className="course-cat">
                    <img src={webDevelopment} alt="" className="img-fluid cat-img" />
                    <div className="cat-title text-center">
                      <h6 className='text-uppercase'>Web Development</h6>
                      <p>49 Courses</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mt-3">
                  <div className="course-cat">
                    <img src={graphicsDesign} alt="" className="img-fluid cat-img" />
                    <div className="cat-title text-center">
                      <h6 className='text-uppercase'>Grapics Design</h6>
                      <p>49 Courses</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mt-3">
                  <div className="course-cat">
                    <img src={videoEditing} alt="" className="img-fluid cat-img" />
                    <div className="cat-title text-center">
                      <h6 className='text-uppercase'>Video Editing</h6>
                      <p>49 Courses</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 single-course mt-3">
                  <div className="course-cat">
                      <img src={selfDevelopment} alt="" className="img-fluid cat-img" />
                      <div className="cat-title text-center">
                      <h6 className='text-uppercase'>Personal Development</h6>
                      <p>49 Courses</p>
                      </div>
                  </div>
                </div>

            
          </div>
        </div>
      </section>
    </div>
  )
}

export default Coursecategory
