import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          <h1 className="text 4xl py-8 mb-10 bg-slate-800 text-white rounded">
            Expense Tracker
          </h1>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div>
          <ul>
            <li className="nav-item">
              <NavLink className="nav-link" to="/create">
                Create New Expense
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
