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
  const [showNavButtons, setShowNavButtons] = useState(true);

  const hideNavButtons = (state) => setShowNavButtons(state);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar showNavButtons={showNavButtons} />

        <Routes>
          <Route path="/" element={<UserLogin  hideNavButtons={hideNavButtons} />} />
          <Route path="/signup" element={<UserSignup hideNavButtons={hideNavButtons} />} />
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
              <MyCourses />
            </PrivateRoute>
          } />
          
          <Route path="/add-course" element={
            <PrivateRoute>
              <AddCourse />
            </PrivateRoute>
          } />

          <Route path="*" element={<NotFound /> } />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App;