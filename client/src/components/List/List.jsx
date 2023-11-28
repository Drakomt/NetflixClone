import Carousel from "react-multi-carousel";
import "./List.scss";
import "react-multi-carousel/lib/styles.css";
import ListItem from "../ListItem/ListItem";

const List = ({ list, title }) => {
  const responsive = {
    superLargeDesktop5: {
      breakpoint: { max: 4000, min: 2100 },
      items: 8,
    },
    superLargeDesktop4: {
      breakpoint: { max: 2100, min: 1875 },
      items: 7,
    },
    superLargeDesktop3: {
      breakpoint: { max: 1875, min: 1650 },
      items: 6,
    },
    superLargeDesktop2: {
      breakpoint: { max: 1650, min: 1425 },
      items: 5,
    },
    superLargeDesktop: {
      breakpoint: { max: 1425, min: 1200 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1200, min: 900 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 900, min: 676 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 676, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="list">
      <span className="listTitle">{title}</span>

      <Carousel
        // className="carousel"
        // responsive={responsive}
        // infinite={true}
        // centerMode={true}
        // swipeable={true}
        // draggable={true}
        // keyBoardControl={true}
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={10000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        removeArrowOnDeviceType={[]}
        className="carousel"
        itemClass="item"
      >
        {list.map((content, i) => (
          <ListItem className="item" key={i} content={content} />
        ))}
      </Carousel>
    </div>
  );
};

export default List;

//! Lazy loading option(need to fix sending type and genre to api)
// import Carousel from "react-multi-carousel";
// import "./List.scss";
// import "react-multi-carousel/lib/styles.css";
// import ListItem from "../ListItem/ListItem";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { customFetch } from "../../utils/customFetch";
// import Loading from "../Loading/Loading";

// const List = ({ genre, type }) => {
//   const { token } = useSelector((state) => state.userSlice);
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await customFetch(
//           `content/filter${type ? "?type=" + type : ""}`,
//           "GET",
//           {
//             data: { type: type },
//             headers: { authorization: `Bearer ${token}` },
//           }
//         );
//         setList(response.content);
//         setLoading(false);
//       } catch (error) {
//         console.log("Error: ", error);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [type, genre, token]);

//   const responsive = {
//     superLargeDesktop5: {
//       breakpoint: { max: 4000, min: 2100 },
//       items: 8,
//     },
//     superLargeDesktop4: {
//       breakpoint: { max: 2100, min: 1875 },
//       items: 7,
//     },
//     superLargeDesktop3: {
//       breakpoint: { max: 1875, min: 1650 },
//       items: 6,
//     },
//     superLargeDesktop2: {
//       breakpoint: { max: 1650, min: 1425 },
//       items: 5,
//     },
//     superLargeDesktop: {
//       breakpoint: { max: 1425, min: 1200 },
//       items: 4,
//     },
//     desktop: {
//       breakpoint: { max: 1200, min: 900 },
//       items: 3,
//     },
//     tablet: {
//       breakpoint: { max: 900, min: 676 },
//       items: 2,
//     },
//     mobile: {
//       breakpoint: { max: 676, min: 0 },
//       items: 1,
//     },
//   };

//   return (
//     <div className="list">
//       <span className="listTitle">{genre}</span>
//       {loading ? (
//         <Loading />
//       ) : (
//         <Carousel
//           className="carousel"
//           responsive={responsive}
//           infinite={true}
//           centerMode={true}
//           swipeable={true}
//           draggable={true}
//           keyBoardControl={true}
//         >
//           {list.map((item, i) => (
//             <ListItem className="item" key={i} item={item} />
//           ))}
//         </Carousel>
//       )}
//     </div>
//   );
// };

// export default List;
