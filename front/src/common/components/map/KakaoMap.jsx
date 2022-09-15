/*global kakao*/
import { Container } from "@mui/system";
import React, { useRef, useEffect, useState } from "react";
import MapList from "./MapList";
import { AlertWrite } from "../../index";
import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";

import "./Mapnumberstyle.css";

const APP_KEY = process.env.REACT_APP_KAKAO_API;

const KakaoMap = ({
  keyword,
  setKeyword,
  setSelect,
  select,
  Duration,
  setDuration,
  isDetail,
  board,
  maxstep,
  mapDay,
}) => {
  //========================axois==================
  // useEffect(() => {
  //   console.log(board.location);
  // }, [board]);

  useEffect(() => {
    console.log("1");
    // console.log(board[0].x);
    if (board != undefined) {
      console.log(board[0]);
      console.log(board[1]);
    }
  }, [board]);
  //===================button control===================
  const [btnHandler, setBtnHandler] = React.useState(true);
  const btnClick = (e) => {
    setBtnHandler(false);
  };
  //=======================================================
  const script = document.createElement("script");
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&libraries=services,clusterer,drawing&autoload=false`;
  document.head.appendChild(script);
  //검색 결과에서 원하는 값을 저장하는 status
  const [address, setAddress] = useState();
  //검색 결과를 저장하는 status
  const [kakaoMap, setKakaoMap] = useState([]);
  // const [mapFocus, setmapFocus] = useState([]);
  const container = useRef();

  const SearchKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const SendKeyword = () => {
    setAddress(keyword);
  };
  const Send_MAXDURATION = (e) => {
    setDuration(e.target.value);
    // console.log(Duration);
  };

  useEffect(() => {
    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        const center = new kakao.maps.LatLng(
          37.365264512305174,
          127.10676860117488
        );
        const options = {
          center,
          level: 7,
        };
        var map = new kakao.maps.Map(container, options);
        // 상세 주소로 검색하려면 이거 쓰세요 (거리명?)
        // var geocoder = new kakao.maps.services.Geocoder();
        // 카테고리로 검색
        var ps = new kakao.maps.services.Places();
        //========================detail===================================
        //   var marker = new kakao.maps.Marker({
        //     map: map, // 마커를 표시할 지도
        //     title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        // });
        // //=======================pickmarker=================================
        let map_x = 0;
        let map_y = 0;
        if (!isDetail && mapDay !== undefined && board !== undefined) {
          console.log("marker를 찍어요");
          console.log("board.length", board.length);
          console.log(board);
          for (var j = 0; j < board[mapDay].length; j++) {
            console.log("오니?");
            console.log("board.x", typeof Number(board[mapDay][j].x));
            var location1 = new kakao.maps.LatLng(
              Number(board[mapDay][j].y),
              Number(board[mapDay][j].x)
            );
            map_x += Number(board[mapDay][j].x);
            map_y += Number(board[mapDay][j].y);
            var marker2 = new kakao.maps.Marker({
              map: map,
              position: location1,
            });
            marker2.setMap(map);
          }
          map.setCenter(
            new kakao.maps.LatLng(
              map_y / board[mapDay].length,
              map_x / board[mapDay].length
            )
          );
        }

        //==========================================================
        // isDetail ? (
        if (address === undefined) {
          console.log("ddd");
        } else {
          ps.keywordSearch(address, function (result, status) {
            if (!keyword.replace(/^\s+|\s+$/g, "") || result.length === 0) {
              let errormessage = "키워드를 확인하세요";
              console.log("키워드를 확인하세요");
              // <AlertWrite errormessage={errormessage} />
            } else if (status === kakao.maps.services.Status.OK) {
              setKakaoMap(result);
              for (var i = 0; i < result.length; i++) {
                var coords = new kakao.maps.LatLng(result[i].y, result[i].x);
                //결과값으로 받은 위치를 마커로 표시합니다.
                var marker = new kakao.maps.Marker({
                  map: map,
                  position: coords,
                });
                // 인포윈도우로 장소에 대한 설명을 표시합니다
                var infowindow = new kakao.maps.InfoWindow({
                  content: `<div style="width:150px;text-align:center;padding:6px 0;">${result[i].place_name}</div>`,
                });
                // js 마우스 오버 , 아웃 이벤트
                (function (marker, infowindow) {
                  // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다
                  kakao.maps.event.addListener(
                    marker,
                    "mouseover",
                    function () {
                      infowindow.open(map, marker);
                    }
                  );
                  // 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
                  kakao.maps.event.addListener(marker, "mouseout", function () {
                    infowindow.close();
                  });
                })(marker, infowindow);
              }
              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
            }
          });
        }
        //=======================write=================================
      });
    };
    // container or address의 변동점이 있을때 rendering
  }, [container, address, board, mapDay]);
  return (
    <Container>
      {isDetail ? (
        <div>
          {/* number로만 받고 onchage로 기간을 받음. 최소 숫자는 1 */}
          <input
            type={"number"}
            onChange={Send_MAXDURATION}
            placeholder={"기간 입력"}
            min={"1"}
            disabled={!btnHandler}
          />
          {/* <TextField style={{ MozAppearance: "none" }} label="기간 입력" onChange={Send_MAXDURATION} type={"number"} /> */}
          {/* 등록 버튼을 누르면 onclick ev로 안의 값이 음수인지 글자인지 확인 후 옳바른 값이면 
        다음 태그를 띄어줌 */}
          <button
            // onClick={ }
            type="button"
            onClick={btnClick}
          >
            등록
          </button>
          <br />
          키워드 :{" "}
          <input type="text" id="keyword" size="15" onChange={SearchKeyword} />
          <button type="button" onClick={SendKeyword}>
            검색하기
          </button>
        </div>
      ) : null}
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      {isDetail ? (
        <MapList kakaoMap={kakaoMap} select={select} setSelect={setSelect} />
      ) : null}
    </Container>
  );
};

export default KakaoMap;
