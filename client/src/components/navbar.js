import React from "react";
import logo from "./img/Logo.jpg";
import MoneyBuddy from "./img/MoneyBuddy.png";

import "bootstrap/dist/css/bootstrap.css";

import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="flex items-center justify-center rounded-sm border-b-2">
        <NavLink className="navbar-brand" to="/">
          <img src={MoneyBuddy} alt="" className="w-60"></img>
        </NavLink>

        <div>
          {" "}
          <ul>
            <li className="nav-item">
              <NavLink
                className="inline-block px-6 py-2.5 bg-green-700 text-green-100 font-medium text-sm leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out no-underline m-5"
                to="/create"
              >
                + Create A New Expense
              </NavLink>
            </li>
          </ul>
        </div>
        <img
          className="h-20 w-20 mr-2 rounded-3xl m-2"
          src={logo}
          alt="Logo"
        ></img>
      </nav>
    </div>
  );
}
