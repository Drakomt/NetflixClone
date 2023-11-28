export const TypeFilter = (list) => {
  const movies = list.filter((content) => !content.isSeries);
  const series = list.filter((content) => content.isSeries);

  return { movies, series };
};

export const GenresFilter = (list, genres) => {
  const filteredLists = [];

  genres.forEach((genre) => {
    filteredLists[genre] = [];
  });

  list.forEach((contentItem) => {
    const contentGenre = contentItem.genre;
    if (filteredLists[contentGenre]) {
      filteredLists[contentGenre].push(contentItem);
    }
  });

  return filteredLists;
};
