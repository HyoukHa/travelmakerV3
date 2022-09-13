/**
 * LinkButton.jsx
 * 
 * 링크를 걸어야 하는 버튼의 디자인 및 props를 통한 컴포넌트 구현
 * 
 * 컴포넌트를 수정
 */

import { Button } from '@mui/material';
import React from 'react';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { fontSize } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const LinkButton = ({ content, color, navi }) => {
  const navigate = useNavigate();
  return (
    <Button style={{
      color: color ? color : "white",
    }} onClick={() => navigate(`${navi}`)} >
      {content}
    </Button >
  );
};



export default LinkButton;