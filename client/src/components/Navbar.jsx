import React, { useState } from 'react';
import "./Navbar.css";
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material';
import FlexBetween from 'components/FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from 'state';
import { useTheme, AppBar, Toolbar, IconButton } from '@mui/material';

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <>
      <nav className="navbar">
        <div className="navbar__container">

          <a href="/" id="navbar__logo">BREATH DC</a>
          <div className="navbar__toggle" id="mobile-menu">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul className="navbar__menu">
            <li className="navbar__item">
              <a href="/" className="navbar__links">
                Home
              </a>

            </li>
            <li className="navbar__item">
              <a href="/airquality" className="navbar__links">
                Table
              </a>

            </li>
            <li className="navbar__btn">
              <a href="/checkstatus" className="button">
                Search Your ID
              </a>
            </li>
          </ul>


        </div>
      </nav>





    </>
  )
}

export default Navbar
