import React from "react";
import { Link } from "react-router-dom"; 

const Header = ({ lightMode, setLightMode }) => {
    return (
        <header className="navbar navbar-expanded-lg shadow">
            <div className="container">
                
                <Link to="/" className="navbar-brand logo fw-bold">Movie App</Link> 
                <ul className="d-flex align-items-center justify-content-center gap-5">
                    <li>
                        <select
                            name=""
                            id=""
                            style={{ background: "transparent" }}
                            className="border-0"
                        >
                            <option value="en">En</option>
                            <option value="ar">Ar</option>
                            <option value="ar">Fr</option>


                        </select>
                    </li>
                    <li>
    <Link to="/tv" className="text-decoration-none fw-bold">TV Shows</Link>
  </li>
                    <li className="d-flex align-items-center gap-2">
                        
                        <Link to="/favorites" className="d-flex align-items-center gap-2 text-decoration-none text-dark">
                            <i
                                className="fa-solid fa-heart"
                                style={{ fontSize: "25px", color: "#777" }}
                            ></i>
                            <span>WatchList</span>
                        </Link>
                    </li>
                    <li>
                        <i
                            className={`fa-regular ${lightMode ? "fa-moon" : "fa-sun"}`}
                            onClick={() => setLightMode(!lightMode)}
                        ></i>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;