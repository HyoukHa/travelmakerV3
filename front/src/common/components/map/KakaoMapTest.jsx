/*global kakao*/
import React, {useRef, useEffect, useState } from "react";


const KakaoMapTest = () => {
  const [kakaoMap, setKakaoMap] = useState(null);
  const container = useRef();
  useEffect(() => {
    const script = document.createElement("script");
    script.src ="//dapi.kakao.com/v2/maps/sdk.js?appkey=f8058c46dfde30bda68af4ed6b0be3dc&autoload=false";
    document.head.appendChild(script);

    script.onload = () =>{
      kakao.maps.load(()=>{
          const center = new kakao.maps.LatLng(37.365264512305174, 127.10676860117488)
          const options ={center,level: 3,
          };
          var map = new kakao.maps.Map(container, options);
        setKakaoMap(map);
      })
    }
    const container = document.getElementById("map");
  }, [container]);

  
  return (
    <div id="map" ref={container} style={{width:'500px', height:'400px'}}>
    </div>
  );
};

export default KakaoMapTest;
