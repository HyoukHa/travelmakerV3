/**
 * 
 * 
 * 작성자 : 권혁하 - HHdev
 * 작업 시작일 : 2022.08.19
 * 최종 수정일 : 
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { KAKAO_AUTH_URL } from "../../../../config/index"

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const Kakao = () => {
  const code = new URL(window.location.href).searchParams.get('code');

  return (
    <div css={cssWrapper}>
      <a href={KAKAO_AUTH_URL}>
        <img src="./kakaoLogo.png" style={{ cursor: "pointer" }} />
      </a>
    </div>
  );
};

const cssWrapper = css`
  padding-top: 100px;
`

export default Kakao;