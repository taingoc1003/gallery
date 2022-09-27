import React from "react";
import "./App.scss";
import "aos/dist/aos.css"

import Nav from "Components/Nav/Nav";
import Home from "Views/Home";
import Movie from "Views/Movie/movie";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";


import {
  BrowserRouter as Router
} from "react-router-dom";


function App() {



  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav />
        </header>

        <section className="app-body">

          <Routes>
            <Route exact="true" path="/" element={<Home />}>
            </Route>
            <Route path="/movie" element={<Movie />}>
            </Route>
          </Routes>


        </section>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />

    </Router>
  );
}

export default App;
