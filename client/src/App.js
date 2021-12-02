import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Postpage from "./Pages/Postpage";
import { Register, SignIn } from "./Pages/AuthPages";
import UserContext from "./util/UserContext";
import { useEffect, useState } from "react";

function App() {
  /**
   * user:
   *  null = no user signed in
   *  undefined = currently getting user from server
   */
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    async function getUserFromServer() {
      const userFromApi = await fetch("/currentUser", {
        credentials: "include",
      });
      const userJson = await userFromApi.json();
      if (userJson.username) {
        setUser(userJson);
      } else {
        setUser(undefined);
      }
    }
    getUserFromServer();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />

          <Route exact path="/post/add" element={<Postpage />} />

          <Route exact path="/register" element={<Register />} />

          <Route exact path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
