import './App.css'
import TaskComponent from './components/TaskComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListTaskComponent from './components/ListTaskComponent'
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<ListTaskComponent />}></Route>
          <Route path="/tasks" element={<ListTaskComponent />}></Route>
          <Route path="/add-task" element={<TaskComponent />}></Route>
          <Route
            path="/update-task/:id"
            element={<TaskComponent />}
          ></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;