<<<<<<< HEAD
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
=======
import Category from "../Components/CategoryApiTesting";
function App() {
  return (
    <>

      <h1 className="text-4xl text-center mt-10">Under Construction</h1>
      <Category></Category>
    </>
>>>>>>> fa224424805751795766b7694294a5a4ef08041c
  );
}

export default App;
