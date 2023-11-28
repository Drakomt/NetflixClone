import ReactPlayer from "react-player";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
// import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { Btn } from "../Btn";
import "./HoverCard.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { setSingleContent } from "../../store/contentSlice";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export const HoverCard = ({ content }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.userSlice);
  const [play, setPlay] = useState(false);

  // const isFavorite = user.favoritesList.some(
  //   (item) => item._id === content._id
  // );
  const isFavorite = user.favoritesList.some(
    (contentId) => contentId === content._id
  );

  // const isLike = user.likeList?.some((item) => item._id === content._id);
  // const isDislike = user.dislikeList?.some((item) => item._id === content._id);

  const navToInfo = () => {
    dispatch(setSingleContent(content));
    navigate(`/content/${content._id}`);
  };

  const handleFavoriteToggle = () => {
    dispatch(
      toggleFavorite({
        data: {
          contentId: content._id,
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
    );
  };

  // const handleLikeToggle = () => {
  //   dispatch(toggleLike(content._id));
  // };

  // const handleDislikeToggle = () => {
  //   dispatch(toggleDislike(content._id));
  // };

  const playTrailer = () => {
    setPlay(true);
  };

  // const navToWatch = () => {
  //     dispatch(setSingleContent(content));
  //     navigate(`/content/${content._id}/movie`);
  // }

  // return (
  //   <div className="hoverCard">
  //     <ReactPlayer
  //       url={content.trailer}
  //       playing={play}
  //       width={"100%"}
  //       height={"100%"}
  //       className="player"
  //       light={true}
  //     />
  //     <div className="buttons">
  //       <Btn onClick={playTrailer}>
  //         <PlayCircleOutlineIcon />
  //       </Btn>
  //       <Btn onClick={handleFavoriteToggle}>
  //         {isFavorite ? (
  //           <CheckIcon style={{ color: "red" }} />
  //         ) : (
  //           <AddCircleOutlineIcon />
  //         )}
  //       </Btn>
  //       {/* <Btn onClick={handleDislikeToggle}>
  //         <ThumbDownOutlinedIcon
  //           style={{ color: isDislike ? "red" : "white" }}
  //         />
  //       </Btn>
  //       <Btn onClick={handleLikeToggle}>
  //         <ThumbUpOutlinedIcon style={{ color: isLike ? "red" : "white" }} />
  //       </Btn> */}
  //     </div>
  //     <div className="info" onClick={navToInfo}>
  //       <p>
  //         {content.duration}
  //         <span className="age">+{content.limit}</span>
  //         {content.year}
  //       </p>
  //       <p>{content.genre}</p>
  //     </div>
  //   </div>
  // );

  return (
    <>
      <ReactPlayer
        className="video"
        height={145}
        width={300}
        url={content.trailer}
        playing={true}
      ></ReactPlayer>
      <div className="itemInfo">
        <div className="icons">
          {/* <AddIcon className="icon" />
              <ThumbUpOutlinedIcon className="icon" />
              <ThumbDownOffAltOutlinedIcon className="icon" /> */}
          <button
            onClick={() => {
              dispatch(setSingleContent(content));
              navigate("/watch");
            }}
          >
            <PlayArrowIcon className="icon" />
          </button>
          <button
            onClick={() => {
              dispatch(
                toggleFavorite({
                  data: {
                    contentId: content._id,
                  },
                  headers: {
                    authorization: `Bearer ${token}`,
                  },
                })
              );
            }}
          >
            {isFavorite ? (
              <CheckIcon className="icon" style={{ color: "red" }} />
            ) : (
              <AddIcon className="icon" />
            )}
          </button>
          <button
            onClick={() => {
              dispatch(setSingleContent(content));
              navigate("/info");
            }}
          >
            <InfoOutlinedIcon className="icon" />
          </button>
        </div>
        <div className="itemInfoTop">
          <span>{content.duration}</span>
          <span className="limit">+{content.limit}</span>
          <span>{content.year}</span>
        </div>
        <div className="desc">{content.desc}</div>
        <div className="genre">{content.genre}</div>
      </div>
    </>
  );
};
