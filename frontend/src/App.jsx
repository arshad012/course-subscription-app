// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { useState } from "react";

import { UserSignup } from "./pages/UserSignup";
import { UserLogin } from "./pages/UserLogin";
import { Courses } from "./pages/Courses";
import { store } from "./redux/store";
import { PrivateRoute } from "./components/privateRoute";
import { SingleCoursePage } from "./pages/SingleCoursePage";
import { MyCourses } from "./pages/MyCourses";
import { Navbar } from "./components/navbar";
import { AddCourse } from "./pages/AddCourse";
import { NotFound } from "./pages/NotFound";

function App() {
  const [showNavButtons, setShowNavButtons] = useState({
    showLogoutBtn: true,
    showMyCourseBtn: true
  });

  const handleNavButtons = ({ showLogoutBtn = true, showMyCourseBtn = true }) => {
    setShowNavButtons({ showLogoutBtn, showMyCourseBtn });
    // This function can be used into any component on which page you need to hide "logout" and "my course" button,
    // NOTE: use this function in useEffect and in clean up function set it to it's earliest state.
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar showLogoutBtn={showNavButtons.showLogoutBtn} showMyCourseBtn={showNavButtons.showMyCourseBtn} />

        <Routes>
          <Route path="/" element={<UserLogin handleNavButtons={handleNavButtons} />} />
          <Route path="/signup" element={<UserSignup handleNavButtons={handleNavButtons} />} />
          <Route path="/courses" element={
            <PrivateRoute>
              <Courses />
            </PrivateRoute>
          } />

          <Route path="/courses/:courseId" element={
            <PrivateRoute>
              <SingleCoursePage />
            </PrivateRoute>
          } />

          <Route path="/user/:userId/subscriptions" element={
            <PrivateRoute>
              <MyCourses handleNavButtons={handleNavButtons} />
            </PrivateRoute>
          } />

          <Route path="/add-course" element={
            <PrivateRoute>
              <AddCourse />
            </PrivateRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App;