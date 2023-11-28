import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SearchPage.scss";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { customFetch } from "../../utils/customFetch";
import { getGenres, setSingleContent } from "../../store/contentSlice";

const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [searchText, setSearchtext] = useState("");
  const queryParam = searchParams.get("query") || "";
  const genreParam = searchParams.get("genre") || "";
  const [content, setContent] = useState([]);
  //   const { user } = useContext(AuthContext);
  const { user, token } = useSelector((state) => state.userSlice);
  const { error, loading, genres } = useSelector((state) => state.contentSlice);

  useEffect(() => {
    setSearchtext(queryParam);

    const getResult = async () => {
      try {
        genres &&
          dispatch(
            getGenres({
              headers: { authorization: `Bearer ${token}` },
            })
          );
        const result = await axios.get(
          "content/search" +
            `${genreParam || queryParam ? "?" : ""}${
              genreParam ? `genre=${genreParam}` : ""
            }${genreParam && queryParam ? "&" : ""}${
              queryParam ? `query=${queryParam}` : ""
            }`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        // const result = await customFetch(
        //   "content/search",
        //   "GET",
        //   {},
        //   { autorization: `Bearer ${user.token}` }
        // );
        setContent(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getResult();
  }, [queryParam, genreParam]);

  useEffect(() => {
    onSearchStart();
  }, [searchText]);

  useEffect(() => {
    if (!user) navigate("/signin");
  }, [user]);

  const onSearchStart = async () => {
    navigate(
      `${genreParam || searchText ? "?" : ""}${
        genreParam ? `genre=${genreParam}` : ""
      }${genreParam && searchText ? "&" : ""}${
        searchText ? `query=${searchText}` : ""
      }`
    );
  };

  return (
    <>
      <div className="main">
        <NavBar className="nav" />

        <div className="search">
          <div className="options">
            <div className="searchGroup">
              <input
                type="text"
                className="searchInput"
                onChange={(e) => setSearchtext(e.target.value)}
              />
              <button className="searchbutton" onClick={() => onSearchStart()}>
                <SearchIcon />
              </button>
            </div>
            <ul className="genres">
              <li
                onClick={() =>
                  navigate(searchText ? `?query=${searchText}` : "")
                }
              >
                Genre
              </li>
              {genres &&
                genres[0] &&
                genres.map((genre, i) => (
                  <li
                    value={genre}
                    key={i}
                    onClick={() =>
                      navigate(
                        searchText
                          ? `?genre=${genre}&query=${searchText}`
                          : `?genre=${genre}`
                      )
                    }
                  >
                    {genre}
                  </li>
                ))}
            </ul>
          </div>
          <div className="results">
            <h3 className="resultText">
              Your results: {queryParam ? `input: ${queryParam}, ` : " "}{" "}
              {genreParam ? `genre: ${genreParam}` : ""}{" "}
              {queryParam || genreParam ? (
                <CloseIcon
                  className="clearbutton"
                  onClick={() => {
                    navigate("/search");
                  }}
                />
              ) : (
                ""
              )}{" "}
            </h3>
            <div className="results-items">
              <div className="movies">
                <h2>Movies</h2>
                <div className="moviesRes">
                  {content &&
                    content[0] &&
                    content.map(
                      (item, i) =>
                        item.isSeries === false && (
                          <button
                            onClick={() => {
                              dispatch(setSingleContent(item));
                              navigate("/info");
                            }}
                            className="button-link"
                            key={i}
                          >
                            <img
                              src={item.imgThumb}
                              alt={item.title}
                              key={i}
                              className="content"
                            />
                          </button>
                          // <Link
                          //   to={{ pathname: `/info/${item._id}` }}
                          //   className="link"
                          //   key={i}
                          // >
                          //   <img
                          //     src={item.imgThumb}
                          //     alt={item.title}
                          //     key={i}
                          //     className="content"
                          //   />
                          // </Link>
                        )
                    )}
                </div>
              </div>
              <div className="series">
                <h2>Series</h2>
                <div className="moviesRes">
                  {content &&
                    content[0] &&
                    content.map(
                      (item, i) =>
                        item.isSeries && (
                          <button
                            onClick={() => {
                              dispatch(setSingleContent(item));
                              navigate("/info");
                            }}
                            className="button-link"
                            key={i}
                          >
                            <img
                              src={item.imgThumb}
                              alt={item.title}
                              key={i}
                              className="content"
                            />
                          </button>
                          // <Link
                          //   to={{ pathname: `/info/${item._id}` }}
                          //   className="link"
                          //   key={i}
                          // >
                          //   <img
                          //     src={item.imgThumb}
                          //     alt={item.title}
                          //     key={i}
                          //     className="content"
                          //   />
                          // </Link>
                        )
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
