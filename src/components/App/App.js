import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LoggedInContext } from "../../context/LoggedInContext";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <LoggedInContext.Provider value={loggedIn}>
      <div className="page">
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
        </Routes>
      </div>
    </LoggedInContext.Provider>
  );
}

export default App;
