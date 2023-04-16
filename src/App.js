import Auth from './components/Auth';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from './components/Todo';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
import './App.css';

function App() {
  return (
    <div>
    <Router>      
          <Routes>
            <Route path="/" element={<Auth />}/>
            <Route path="/todo" element={<Todo />}/>
          </Routes>
    </Router>
    <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="dark"
        />
    </div>
  );
}
export default App;
