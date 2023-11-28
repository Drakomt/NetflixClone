import "./ListItem.scss";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReactPlayer from "react-player";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleContent } from "../../store/contentSlice";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { toggleFavorite } from "../../store/userSlice";
import { HoverCard } from "../HoverCard/HoverCard";

const ListItem = ({ content }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.userSlice);
  const isFavorite = user.favoritesList.some(
    (contentId) => contentId === content._id
  );
  //console.log("user.favoritesList: " + user.favoritesList);
  return (
    <>
      {content && (
        <div
          className="listItem"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img src={content?.imgThumb} alt="" />
          {isHovered && (
            <HoverCard content={content} />
            // <>
            //   <ReactPlayer
            //     className="video"
            //     height={145}
            //     width={300}
            //     url={content.trailer}
            //     playing={true}
            //   ></ReactPlayer>
            //   <div className="itemInfo">
            //     <div className="icons">
            //       {/* <AddIcon className="icon" />
            //   <ThumbUpOutlinedIcon className="icon" />
            //   <ThumbDownOffAltOutlinedIcon className="icon" /> */}
            //       <button
            //         onClick={() => {
            //           dispatch(setSingleContent(content));
            //           navigate("/watch");
            //         }}
            //       >
            //         <PlayArrowIcon className="icon" />
            //       </button>
            //       <button
            //         onClick={() => {
            //           dispatch(
            //             toggleFavorite({
            //               data: {
            //                 contentId: content._id,
            //               },
            //               headers: {
            //                 authorization: `Bearer ${token}`,
            //               },
            //             })
            //           );
            //         }}
            //       >
            //         {isFavorite ? (
            //           <CheckIcon className="icon" style={{ color: "red" }} />
            //         ) : (
            //           <AddIcon className="icon" />
            //         )}
            //       </button>
            //       <button
            //         onClick={() => {
            //           dispatch(setSingleContent(content));
            //           navigate("/info");
            //         }}
            //       >
            //         <InfoOutlinedIcon className="icon" />
            //       </button>
            //     </div>
            //     <div className="itemInfoTop">
            //       <span>{content.duration}</span>
            //       <span className="limit">+{content.limit}</span>
            //       <span>{content.year}</span>
            //     </div>
            //     <div className="desc">{content.desc}</div>
            //     <div className="genre">{content.genre}</div>
            //   </div>
            // </>
          )}
        </div>
      )}
    </>
  );
};

export default ListItem;
