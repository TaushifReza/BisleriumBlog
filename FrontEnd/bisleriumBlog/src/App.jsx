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
import Forget from '../Components/forget';
import TwoFactor from '../Components/Twofactor';
import Verifyemail from '../Components/Verifyemail';
function App() {
  return (
    <Router>
      <div>
        <Routes>

          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/emailtemp" element={<Emailtemp />} />
          <Route exact path="/forget" element={<Forget />} />
          <Route exact path="/twofactor" element={<TwoFactor />} />
          <Route exact path="/verifyemail" element={<Verifyemail />} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;