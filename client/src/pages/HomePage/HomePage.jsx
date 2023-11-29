import { useNavigate } from "react-router-dom";
import "./HomePage.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContent, getGenres } from "../../store/contentSlice";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import RandomContent from "../../components/RandomContent/RandomContent";
import List from "../../components/List/List";
import { GenresFilter } from "../../utils/filter";
// import { GenresFilter,ShuffledLists } from "../../utils/filter";
import NavBar from "../../components/NavBar/NavBar";

const HomePage = ({ type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [randomIndex, setRandomIndex] = useState(0);

  const { user, token } = useSelector((state) => state.userSlice);
  const { error, loading, genres } = useSelector((state) => state.contentSlice);
  //const content = useSelector((state) => selectContentByType(state, type));

  const content = useSelector((state) => {
    if (type === "movies") {
      return state.contentSlice.movies;
    } else if (type === "series") {
      return state.contentSlice.series;
    } else {
      return state.contentSlice.content;
    }
  });

  useEffect(() => {
    if (!user) {
      navigate("/signin?redirect=/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const getContentLists = async () => {
      try {
        token &&
          // !genres &&
          dispatch(
            getGenres({
              headers: { authorization: `Bearer ${token}` },
            })
          );
        token &&
          // !content &&
          dispatch(
            getContent({
              // type: type,
              headers: { authorization: `Bearer ${token}` },
            })
          );
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    // const filteredLists = GenresFilter(content, genres);
    // console.log("filteredLists: ", filteredLists);

    if (content.length === 0) {
      getContentLists();
    }
  }, [type]);

  useEffect(() => {
    const getRandomContent = (length) => {
      return Math.floor(Math.random() * length);
    };
    getRandomContent();
    const interval = setInterval(() => {
      setRandomIndex(getRandomContent(content.length));
    }, 4000);
    return () => clearInterval(interval);
  }, [content]);

  const filteredLists = GenresFilter(content, genres);

  //const shuffledLists= ShuffledLists(content, genres.length);

  return (
    <div className="home">
      <NavBar />
      {content && content.length > 0 && (
        <RandomContent
          content={content[randomIndex]}
          className="RandomContent"
        />
      )}
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <>
          {content && (
            <List
              className="list"
              list={content.filter((item) =>
                user.favoritesList.includes(item._id)
              )}
              title="Favorites"
            />
          )}

          {genres &&
            genres.map(
              (genre, i) =>
                filteredLists[genre].length > 0 && (
                  <List
                    className="list"
                    list={filteredLists[genre]}
                    key={i}
                    title={genre}
                  />
                )
            )}

            {/* {genres &&
                  genres.map(
                    (genre, i) =>
                    shuffledLists.length > 0 && (
                        <List
                          className="list"
                          list={shuffledLists[i]}
                          key={i}
                          title={genre}
                        />
                      )
                  )} */}
        </>


      )}
    </div>
  );
};

export default HomePage;

//! Lazy loading option
// import { useNavigate } from "react-router-dom";
// import "./HomePage.scss";
// import React, { Suspense, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getGenres } from "../../store/contentSlice";
// import Navbar from "../../components/NavBar/NavBar";
// import Loading from "../../components/Loading/Loading";
// import Error from "../../components/Error/Error";
// import RandomContent from "../../components/RandomContent/RandomContent";
// // const List = React.lazy(() => import("../../components/List/List"));
// const List = React.lazy(() => {
//   return new Promise((resolve) => setTimeout(resolve, 5 * 1000)).then(() =>
//     import("../../components/List/List")
//   );
// });

// const HomePage = ({ type }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user, token } = useSelector((state) => state.userSlice);
//   const { error, loading, genres } = useSelector((state) => state.contentSlice);

//   useEffect(() => {
//     if (!user) {
//       navigate("/signin?redirect=/");
//     }
//   }, [user, navigate]);

//   useEffect(() => {
//     const getRandomLists = async () => {
//       try {
//         dispatch(
//           getGenres({
//             headers: { authorization: `Bearer ${token}` },
//           })
//         );
//       } catch (error) {
//         console.log("Error: ", error);
//       }
//     };
//     getRandomLists();
//   }, [type]);

//   return (
//     <div className="home">
//       <Navbar />
//       <RandomContent type={type} className="RandomContent" />
//       {loading ? (
//         <Loading />
//       ) : error ? (
//         <Error error={error} />
//       ) : (
//         <Suspense fallback={<Loading />}>
//           {genres.map((genre, i) => (
//             <div key={i}>
//               <List className="list" genre={genre} />
//             </div>
//           ))}
//         </Suspense>
//       )}
//     </div>
//   );
// };

// export default HomePage;
