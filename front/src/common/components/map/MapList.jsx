import * as React from "react";

function MapList({ kakaoMap, select, setSelect }) {
  const datas = kakaoMap.map((mapdata, index) => (
    <li
      onClick={() => {
        setSelect([...select, mapdata]);
      }}
      key={index}
    >
      {" "}
      {mapdata.place_name + mapdata.road_address_name + mapdata.phone}
    </li>
  ));
  return <ul>{datas}</ul>;
}

export default MapList;
