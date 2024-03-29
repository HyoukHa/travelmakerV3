import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PaginationBtn } from "../common";
import PackageCard from "../package/components/element/PackageCard";
import {
  PackageBoard,
  ReviewBoard,
} from "../user/service/boardList/cardList.service";
import { Box } from "@mui/material";
import { getSession } from "../config/session/session";
import axios from "axios";

function Package({ id, page }) {
  const [images, setImages] = React.useState([]);
  const [count, setCount] = React.useState();
  const [isWished, setIsWished] = useState([]);
  // const [pagenation, setPagenation] = React.useState(1);
  //====================Pagination==========================
  const [pageid, setPageid] = React.useState(1);

  // const navi = useNavigate();
  // const handleChange = (e, value) => {
  //   setPageid(value);
  //   navi(`/board/package/${value}`);
  // };
  //==========================================================
  useEffect(() => {
    let abc;
    page === "package"
      ? PackageBoard({ id: id }).then((res) => {
          setCount(Number(res.data.count));
          setImages(res.data.packageData);
          console.log(res.data);

          if (getSession("userInfo") !== null) {
            abc = res.data.packageData.map((map) => {
              return map.id;
            });

            axios({
              url: "/packageboard/iswish",
              method: "post",
              data: abc,
              headers: { Authorization: getSession("Authorization") },
            })
              .then((resp) => {
                setIsWished(resp.data);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
      : ReviewBoard({ id: id })
          .then((res) => {
            console.log(res.data);
            setCount(Number(res.data.count));
            setImages(res.data.reviewData);
          })
          .catch((error) => {
            console.log(error);
          });
  }, [pageid]);

  // useEffect(() => {
  //   setImages(
  //     images.map((item) => {
  //       if (isWished.includes(item.id)) {
  //         return { ...item, isWished: true };
  //       } else {
  //         return { ...item, isWished: false };
  //       }
  //     })
  //   );
  //   console.log(images);
  // }, [isWished]);

  useEffect(() => {
    console.log(isWished);
  }, [isWished]);

  useEffect(() => {}, [images]);
  let PageCheck = count % 8;
  let PageNum = count / 8;
  return (
    <Grid item>
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,22%)",
          gap: "2%",
          justifyContent: `center`,
        }}
      >
        {images.map((step, index) =>
          isWished.includes(step.id) ? (
            <PackageCard key={index} step={step} wish={true} page={page} />
          ) : (
            <PackageCard key={index} step={step} wish={false} page={page} />
          )
        )}
      </Box>
      <PaginationBtn
        pageid={pageid}
        setPageid={setPageid}
        count={PageCheck === 0 ? PageNum : Math.ceil(PageNum)}
      />
      {/* <Pagination
        count={PageCheck === 0 ?
          PageNum :
          Math.ceil(PageNum)}
        page={pageid}
        onChange={handleChange}
      /> */}
    </Grid>
  );
}

export default Package;
