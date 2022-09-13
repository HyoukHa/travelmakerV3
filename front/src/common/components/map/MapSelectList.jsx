import React from "react";

function MapSelectList({ select, setSelect, schedule, setSchedule }) {
  const columns = [`삭제 `, "장소이름", "주소 번호", "번호"];
  const deletedata = (selectdata) => (e) => {
    setSelect(select.filter((element) => element.id !== selectdata));
  };

  const datas = select.map((selectdata, index) => (
    <tr key={index}>
      <td onClick={deletedata(selectdata.id)}>x</td>
      <td>{selectdata.place_name}</td>
      <td>{selectdata.road_address_name}</td>
      <td>{selectdata.phone}</td>
    </tr>
  ));
  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}> {column} </th>
            ))}
          </tr>
        </thead>
        <tbody>{datas}</tbody>
      </table>
    </>
  );
}

export default MapSelectList;
