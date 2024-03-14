import React from "react"
import Slider from "react-slick";
import Studentimg from "../img/Simage.webp"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function StudentSay() {
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        pauseOnHover: false
    };
    return (
        <div>
            <div className="container mt-4">
                <div className="row d-flex justify-content-between">
                    <h1 className="text-center mb-4"> What ur Students Say!</h1>
                    <div className="col-md-5">
                        <p style={{ fontWeight: "initial" }}>Discover the impact of Mentors Academia through the words of our students. Their experiences speak volumes about the transformative power of our platform.Discover the transformative journey that awaits you at Mentors Academia, where every success story is a testament to the enduring impact of mentorship and academic excellence. Your future begins here, and your narrative becomes an integral part of the Mentors Academia legacy.</p>
                    </div>
                    <div className='col-md-6'>
                        <Slider {...settings}>
                            <div className="slider-content">
                                <p style={{ backgroundColor: "#294F71", color: "white" }} className="p-3">The mentors at Accademia have been instrumental in my academic
                                    journey. Their guidance and support have not only helped me
                                    understand complex concepts but also inspired me to pursue
                                    excellence in my field. I'm grateful for the personalized
                                    attention and valuable insights they provide.</p>
                                <div className="d-flex align-items-center justify-content-center student-img">
                                    <img src={Studentimg} alt="" />
                                    <div className=" px-2">
                                        <h3>Client Name</h3>
                                        <p>(Profession)</p>
                                    </div>
                                </div>
                            </div>
                            <div className="slider-content">
                                <p style={{ backgroundColor: "#F69133", color: "white" }} className="p-3">The mentors at Accademia have been instrumental in my academic
                                    journey. Their guidance and support have not only helped me
                                    understand complex concepts but also inspired me to pursue
                                    excellence in my field. I'm grateful for the personalized
                                    attention and valuable insights they provide.</p>
                                <div className="d-flex align-items-center justify-content-center student-img">
                                    <img src={Studentimg} alt="" />
                                    <div className=" px-2">
                                        <h3>Client Name</h3>
                                        <p >(Profession)</p>
                                    </div>
                                </div>
                            </div>
                            <div className="slider-content">
                                <p style={{ backgroundColor: "#294F71", color: "white" }} className="p-3">The mentors at Accademia have been instrumental in my academic
                                    journey. Their guidance and support have not only helped me
                                    understand complex concepts but also inspired me to pursue
                                    excellence in my field. I'm grateful for the personalized
                                    attention and valuable insights they provide.</p>
                                <div className="d-flex align-items-center justify-content-center student-img">
                                    <img src={Studentimg} alt="" />
                                    <div className=" px-2">
                                        <h3>Client Name</h3>
                                        <p >(Profession)</p>
                                    </div>
                                </div>
                            </div>
                            <div className="slider-content">
                                <p className="p-3" style={{ backgroundColor: "#F69133", color: "white" }}>The mentors at Accademia have been instrumental in my academic
                                    journey. Their guidance and support have not only helped me
                                    understand complex concepts but also inspired me to pursue
                                    excellence in my field. I'm grateful for the personalized
                                    attention and valuable insights they provide.</p>
                                <div className="d-flex align-items-center justify-content-center student-img">
                                    <img src={Studentimg} alt="" />
                                    <div className=" px-2">
                                        <h3>Client Name</h3>
                                        <p >(Profession)</p>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}