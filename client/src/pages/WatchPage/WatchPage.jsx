import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import "./WatchPage.scss";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

const WatchPage = () => {
  const navigate = useNavigate();
  const singleContent = useSelector(
    (state) => state.contentSlice.singleContent
  );
  const { user } = useSelector((state) => state.userSlice);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }
  }, [navigate, user]);
  return (
    <div className="watch">
      <Link className="back" to="/">
        <ArrowBackIosNewOutlinedIcon />
        home
      </Link>
      <ReactPlayer
        controls={true}
        className="video"
        height="100%"
        width="100%"
        url={singleContent ? singleContent.movie : ""}
        playing={true}
      ></ReactPlayer>
    </div>
  );
};

export default WatchPage;
