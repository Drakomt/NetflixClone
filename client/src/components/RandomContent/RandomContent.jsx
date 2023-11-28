import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { getSingleContent, setSingleContent } from "../../store/contentSlice";
import "./RandomContent.scss";

export default function RandomContent({ content }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      {content && (
        <div className="RandomContent">
          <img src={content.img} alt={content.title} />
          <div className="info">
            <img src={content.imgTitle} alt={content.title} />
            <span className="desc">{content.description}</span>
            <div className="buttons">
              <button
                className="play"
                onClick={() => {
                  dispatch(setSingleContent(content));
                  navigate("/watch");
                }}
              >
                <PlayArrowIcon />
                <span>Play</span>
              </button>
              <button
                className="more"
                onClick={() => {
                  dispatch(setSingleContent(content));
                  navigate("/info");
                }}
              >
                <InfoOutlinedIcon />
                <span>Info</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

//! Old version (gets type and calls api for content)
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import { getSingleContent } from "../../store/contentSlice";
// import "./RandomContent.scss";

// export default function RandomContent({ type }) {
//   const [randomContent, setRandomContent] = useState({});
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.userSlice.user);
//   const token = useSelector((state) => state.userSlice.token);
//   const singleContent = useSelector(
//     (state) => state.contentSlice.singleContent
//   );

//   const navigate = useNavigate();

//   useEffect(() => {
//     const getRandomContent = async () => {
//       try {
//         dispatch(
//           getSingleContent({
//             type: type,
//             headers: { authorization: `Bearer ${token}` },
//           })
//         );
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getRandomContent();
//     const interval = setInterval(() => {
//       getRandomContent();
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [type]);

//   useEffect(() => {
//     if (singleContent) {
//       setRandomContent(singleContent);
//     }
//   }, [singleContent]);

//   return (
//     <div className="RandomContent">
//       {type && (
//         <div className="category">
//           <span>{type === "movies" ? "Movies" : "Series"}</span>
//         </div>
//       )}
//       <img src={randomContent.img} alt={randomContent.title} />
//       <div className="info">
//         <img src={randomContent.imgTitle} alt={randomContent.title} />
//         <span className="desc">{randomContent.description}</span>
//         <div className="buttons">
//           <button
//             className="play"
//             onClick={() => navigate(`/watch/${randomContent._id}`)}
//           >
//             <PlayArrowIcon />
//             <span>Play</span>
//           </button>
//           <button
//             className="more"
//             onClick={() => navigate(`/details/${randomContent._id}`)}
//           >
//             <InfoOutlinedIcon />
//             <span>Info</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
