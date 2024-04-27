import { useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "../Components/Login";
import Signup from '../Components/Signup';
import Signin from '../Components/Signin';
import Emailtemp from '../Components/Emailtemp';
function App() {
  // const [user, setUser] = useState(undefined);
  return (
    <Router>
      <div>
        <Routes>

          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/emailtemp" element={<Emailtemp />} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;