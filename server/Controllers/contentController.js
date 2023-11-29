import Content from "../Models/ContentSchema.js";

export const getAllContent = async (req, res) => {
  try {
    const allContent = await Content.find();
    allContent ? res.send(allContent) : res.sendStatus(404);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getFillteredContent = async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let content = [];

  try {
    if (typeQuery) {
      const isSeries = typeQuery === "series" ? true : false;
      if (genreQuery) {
        content = await Content.aggregate([
          // { $sample: { size: 10 } },
          { $match: { isSeries: isSeries, genre: genreQuery } },
        ]);

        //content = await Content.find();

      } else {
        content = await Content.aggregate([
          // { $sample: { size: 10 } },
          { $match: { isSeries: isSeries } },
        ]);

        //content = await Content.find();

      }
    } else {
      content = await Content.find();
    }
    res.status(200).json({ content });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getGenres = async (req, res) => {
  try {
    const genres = await Content.distinct("genre");
    res.status(200).json(genres);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSearchedContent = async (req, res) => {
  const query = req.query.query;
  const genre = req.query.genre;
  try {
    let options = {};
    if (query) options.title = { $regex: query, $options: "i" };
    if (genre) options.genre = genre;
    const data = await Content.find(options);

    res.send(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// export const getAllContent = async (req, res) => {
//   try {
//     const allContent = await Content.find({});
//     allContent ? res.send(allContent) : res.sendStatus(404);
//   } catch (err) {
//     console.log("Error: ", err);
//   }
// };

// export const getAllMovies = async (req, res) => {
//   try {
//     const allMovies = await Content.find({ isSeries: false });
//     console.log(allMovies.length);
//     allMovies ? res.send(allMovies) : res.sendStatus(404);
//   } catch (error) {
//     console.log("Error: ", error);
//   }
// };

// export const getContentById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const movie = await Content.findById(id);
//     movie ? res.send(movie) : res.sendStatus(404);
//   } catch (error) {
//     console.log("ERROR", error);
//   }
// };

// export const getAllSeries = async (req, res) => {
//   try {
//     const allSeries = await Content.find({ isSeries: true });
//     console.log(allSeries.length);
//     res.send(allSeries);
//   } catch (error) {
//     console.log("Error: ", error);
//   }
// };
