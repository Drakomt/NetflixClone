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


// function shuffleArray(array) {
//   const shuffledArray = [...array];

//   for (let i = shuffledArray.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));

//     // Swap elements without modifying the original array
//     const temp = shuffledArray[i];
//     shuffledArray[i] = shuffledArray[j];
//     shuffledArray[j] = temp;
//   }

//   return shuffledArray;
// }

// export const ShuffledLists = (list, numberOfLists) => {
//   const shuffledLists = [];

//   // Create specified number of shuffled lists
//   for (let i = 0; i < numberOfLists; i++) {
//     shuffledLists.push(shuffleArray(list));
//   }

//   console.log(shuffledLists);
//   return shuffledLists;
// };

