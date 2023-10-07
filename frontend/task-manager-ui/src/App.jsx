import './App.css'
import TaskComponent from './components/TaskComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListTaskComponent from './components/ListTaskComponent'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import { isUserLoggedIn } from "./services/AuthService";

function App() {
  const AuthenticatedRoute = (children) => {
    const isAuth = isUserLoggedIn();
    if (isAuth) {
      return children;
    }
    return <Navigate to="/" />;
  };

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<LoginComponent />}></Route>
          <Route
            path="/tasks"
            element={
              <AuthenticatedRoute>
                <ListTaskComponent />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route
            path="/add-task"
            element={
              <AuthenticatedRoute>
                <TaskComponent />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route
            path="/update-task/:id"
            element={
              <AuthenticatedRoute>
                <TaskComponent />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route path="/register" element={<RegisterComponent />}></Route>
          <Route path="/login" element={<LoginComponent />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;