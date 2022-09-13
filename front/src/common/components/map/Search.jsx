import React, { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';


const Search = ({ meeting_place }) => {
  const { lat, lon } = useSelector((state => state.locationReducer), shallowEqual)
  const { kakao } = window;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=f8058c46dfde30bda68af4ed6b0be3dc&autoload=false";
    const container = document.querySelector('.kakao-map');
    const options = {
      center: new kakao.maps.LatLng(lat, lon),
      level: 3
    };
    const map = new kakao.maps.Map(container, options);
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(meeting_place, function (result, status) {

      // 정상적으로 검색이 완료됐으면 
      if (status === kakao.maps.services.Status.OK) {

        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new kakao.maps.Marker({
          map: map,
          position: coords
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
          content: '<div style="width:150px;text-align:center;padding:6px 0;">' + meeting_place + '</div>'
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      }
    });
    // 위도, 경도로 변환 및 마커표시
    let markerPosition = new kakao.maps.LatLng(lat, lon);
    let marker = new kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);

  }, [kakao.maps.InfoWindow, kakao.maps.LatLng, kakao.maps.Map, kakao.maps.Marker, kakao.maps.services.Geocoder, kakao.maps.services.Status.OK, lat, lon, meeting_place]);
  return (
    <div className='kakao-map'></div>
  );
}

export default Search;