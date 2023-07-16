/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { css } from "@emotion/react";

const navigationStyle = css({
  position: "relative",
  display: "flex",
  alignItems: "center",
  height: "80px",
  width: "100%",
  padding: "24px",
  backgroundColor: "#333",
  color: "#fff",
});

const logoStyle = css({
  fontSize: "24px",
  fontWeight: "bold",
  marginRight: "auto",
});

const menuWrapperStyle = css({
  border: 0,
  height: "40px",
  width: "40px",
  padding: "4px",
  borderRadius: "50%",
  cursor: "pointer",
  position: "absolute",
  right: "24px",
  display: "none",

  "@media (max-width: 768px)": {
    display: "block",
  },

  "&:hover": {
    backgroundColor: "#d1d1d1",
  },
});

const menuStyle = css({
  marginLeft: "auto",

  "& ul": {
    display: "flex",
    padding: 0,
  },

  "& li": {
    listStyle: "none",
    margin: "0 16px",
  },

  // "& li a": {
  //   textDecoration: "none",
  //   display: "block",
  // },

  "@media (max-width: 768px)": {
    "& ul": {
      flexDirection: "column",
      position: "absolute",
      top: "80px",
      left: 0,
      width: "100%",
      height: "calc(100vh - 80px)",
      backgroundColor: "#333",
      display: "none",
    },

    "& li": {
      textAlign: "center",
      padding: "6px",
      marginTop: "6px",
    },

    // "& li a": {
    //   padding: "16px",
    // },

    "& li:hover": {
      backgroundColor: "#023e7e",
    },
  },
});

const menuButtonStyle = css({
  textDecoration: "none",
  color: "#fff",
});

const Header: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsExpanded(false);
  }, [pathname]);

  return (
    <header>
      <nav css={navigationStyle}>
        <Link css={menuButtonStyle} to="/">
          <h1 css={logoStyle}>AniList</h1>
        </Link>
        <button
          css={menuWrapperStyle}
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            viewBox="0 0 20 20"
            fill="#000"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          css={[
            menuStyle,
            isExpanded && {
              "@media (max-width: 768px)": {
                "& ul": {
                  display: "block",
                },
              },
            },
          ]}
        >
          <ul>
            <NavLink
              css={menuButtonStyle}
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "#ff8d07" : "#fff",
              })}
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              css={menuButtonStyle}
              to="/my-collection"
              style={({ isActive }) => ({
                color: isActive ? "#ff8d07" : "#fff",
              })}
            >
              <li>My Collection</li>
            </NavLink>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
