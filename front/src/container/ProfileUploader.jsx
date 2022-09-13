// import React, { useRef, useState } from "react";
// import S3 from "react-aws-s3";

// const Profile = ({ ownerData, setOwnerData }) => {
//   window.Buffer = window.Buffer || require("buffer").Buffer;
//   //file upload to storage & show preview
//   const [selectedFile, setSelectedFile] = useState(item.img_url);

//   const config = {
//     bucketName: process.env.REACT_APP_BUCKET_NAME,
//     region: process.env.REACT_APP_REGION,
//     accessKeyId: process.env.REACT_APP_ACCESS,
//     secretAccessKey: process.env.REACT_APP_SECRET,
//   };

//   const handleFileInput = (e) => {
//     setSelectedFile(e.target.files[0]);
//     if (e.target.files[0].name.length > 0) {
//       uploadFile(e.target.files[0]);
//     }
//   };

//   const uploadFile = async (file) => {
//     const ReactS3Client = new S3(config);
//     // the name of the file uploaded is used to upload it to S3
//     ReactS3Client.uploadFile(file, file.name)
//       .then((data) => {
//         console.log(data.location);
//         setFile(data.location);
//         setSelectedFile(data.location);
//         setDisplay(false);
//       })
//       .catch((err) => console.error(err));
//   };

//   return (
//     <>
//       <input
//         className="file"
//         type="file"
//         multiple
//         ref={inputFile}
//         onChange={(e) => {
//           handleFileInput(e);
//         }}
//       />
//       <div className="btn lg-btn" onClick={() => newpost()}>
//         Post!
//       </div>
//     </>
//   );
// };

// export default Profile;
