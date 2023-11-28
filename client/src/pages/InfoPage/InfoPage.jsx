import { useNavigate } from "react-router-dom";
import "./InfoPage.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import React, { useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useSelector } from "react-redux";

const InfoPage = () => {
  const navigate = useNavigate();

  const singleContent = useSelector(
    (state) => state.contentSlice.singleContent
  );
  const { user } = useSelector((state) => state.userSlice);

  useEffect(() => {
    if (!user) {
      navigate("/signin?redirect=/");
    }
  }, [user, navigate]);

  return (
    <div className="main">
      <NavBar />
      <div className="centered">
        <div className="details">
          <img
            className="picture"
            src={singleContent ? singleContent.imgVertical : ""}
            alt="img"
          />
          <div className="info">
            <h1>{singleContent ? singleContent.title : ""}</h1>
            <p>{singleContent ? singleContent.description : ""}</p>
            <p>
              Type:{" "}
              {singleContent
                ? singleContent.isSeries
                  ? "Series"
                  : "Movie"
                : ""}
            </p>
            <p>Year: {singleContent ? singleContent.year : ""}</p>
            <p>Duration: {singleContent ? singleContent.duration : ""}</p>
            <p>Age restriction: {singleContent ? singleContent.limit : ""}+</p>
            <p>Genre: {singleContent ? singleContent.genre : ""}</p>
            <div className="buttons">
              <button className="play" onClick={() => navigate("/watch")}>
                <PlayArrowIcon />
                <span>Play</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
