export const getStorageData = () => {
  const movies = localStorage.getItem('movieManiaMovies');
  if (movies) {
    return JSON.parse(movies);
  } else {
    return [];
  }
};

export const setStorageData = (data) => {
  localStorage.setItem('movieManiaMovies', JSON.stringify(data));
};