import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(data);
  const [range, setRange] = useState([1, 2, 3]);

  const searchHandler = () => {
    navigate(`/search/${keyword}`, { state: range });
    navigate(0);
  };

  const enterFilter = (e) => {
    if (e.key == "Enter") {
      searchHandler();
    }
  };

  return (
    <Paper
      className="wrapper"
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
        border: `1px solid #afabab`,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="검색"
        inputProps={{ "aria-label": "search google maps" }}
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        onKeyDown={enterFilter}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={searchHandler}
      >
        <SearchIcon onClick={searchHandler} />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Paper>
  );
};
export default SearchBar;
