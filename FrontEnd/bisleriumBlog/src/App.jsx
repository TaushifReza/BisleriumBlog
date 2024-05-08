
import React from "react";
import { Toaster } from "react-hot-toast";
import MyState from "../context/myState";


function App({ children }) {
  return (
    <MyState>
      <div>
        {children}  {/* Child components will be the routed pages */}
        <Toaster />
      </div>
    </MyState>
  )
}

export default App;
