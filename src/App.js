import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Signup from './components/Signup';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Signin from './components/Signin';
import Adminpanel from './adminside/Adminpanel';
import Dashboard from './adminside/Dashboard';
import Addcourse from './adminside/Addcourse';
import Addteacher from './adminside/Addteacher';
import Addschool from './adminside/AddSchools';
import Adduser from './adminside/Addusers';
import TeacherPage from './components/TeacherPage';
import CoursePage from './components/CoursePage';
import SchoolPage from './components/SchoolPage';
import About from './components/About';
import MyProvider from './contexts/Provider';
import StudentPage from './UserSide/StudentPage';
import StudentCourse from './UserSide/StudentCourse';
import CourseEnrollment from './adminside/CourseEnrollment';
import EnrollCourses from './UserSide/Enrollcourses';
import AcceptedRequest from './adminside/AcceptedRequest';
import RejectedRequest from './adminside/RejectedRequest';
import Coursedetail from './components/Coursedetail';
import Schooldetail from './components/Schooldetail';
import Teacherdetails from './components/Teacherdetails';
import Categories from './adminside/AddCategories';
import SchoolRequest from './adminside/SchoolRequest';
import TeacherRequest from './adminside/TeacherRequest';
import SchoolUser from './schoolUser/Suser';
import RegisterSchool from './schoolUser/RegisterSchool';
import RegisterdSchools from './schoolUser/RegisteredSchools';
import Instructor from './InstructorUser/Instructor';
import InstructorRequest from './InstructorUser/InstructorRequest';
import InstructorAproved from './InstructorUser/InstructorAproved';
import ReajectedTeacher from './adminside/RejectedTeacher';
import RejectedSchool from './adminside/RejectedSchool';
import ScrollTop from './ScrollTop';

function App() {
  return (
    <div>
      <Router>
        <MyProvider>
          <Navbar />
          <ScrollTop />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/teacher' element={<TeacherPage />} />
            <Route path='/course' element={<CoursePage />} />
            <Route path='/about' element={<About />} />
            <Route path='/school' element={<SchoolPage />} />
            <Route path='/school-details/:name' element={<Schooldetail />} />
            <Route path='/course-details/:title' element={<Coursedetail />} />
            <Route path='/teacher-details/:id' element={<Teacherdetails />} />
            <Route path='/adminpanel' element={<Adminpanel />}>
              <Route index element={<Navigate to="dashboard" />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='category' element={<Categories />} />
              <Route path='course' element={<Addcourse />} />
              <Route path='teacher' element={<Addteacher />} />
              <Route path='teacherRequest' element={<TeacherRequest />} />
              <Route path='school' element={<Addschool />} />
              <Route path='schoolRequest' element={<SchoolRequest />} />
              <Route path='acceptedRequest' element={<AcceptedRequest />} />
              <Route path='rejectedRequest' element={<RejectedRequest />} />
              <Route path='users' element={<Adduser />} />
              <Route path='courseenroll' element={<CourseEnrollment />} />
              <Route path='rejectedTeacher' element={<ReajectedTeacher />} />
              <Route path='rejectedSchool' element={<RejectedSchool/>} />
            </Route>
            <Route path='/studentpage' element={<StudentPage />} >
              <Route index element={<Navigate to="studentcourse" />} />
            </Route>
              <Route path='/enrollCourses' element={<EnrollCourses />} />
              <Route path='/studentcourse' element={<StudentCourse />} />
            <Route path='/schoolUser' element={<SchoolUser />} >
              <Route index element={<Navigate to="registerSchool" />} />
              <Route path='registerSchool' element={<RegisterSchool />} />
              <Route path='registerdSchools' element={<RegisterdSchools />} />
            </Route>
            <Route path='/instructorUser' element={<Instructor />}>
              <Route index element={<Navigate to="instructorRequest" />} />
              <Route path='instructorRequest' element={<InstructorRequest />} />
              <Route path='instructorDetail' element={<InstructorAproved />} />
            </Route>
          </Routes>
          <Footer />
        </MyProvider>
      </Router>
    </div>
  );
}

export default App;
