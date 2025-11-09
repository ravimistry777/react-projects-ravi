import godfather from '../assets/songs/godfather.mp3';
import dark from '../assets/songs/dark.mp3';
import sha from '../assets/songs/sha.mp3';
import pulp from '../assets/songs/pulp.mp3';
import forest from '../assets/songs/forest.mp3';
import inc from '../assets/songs/inc.mp3';
import matrix from '../assets/songs/matrix.mp3';
import good from '../assets/songs/good.mp3';
import silent from '../assets/songs/silent.mp3';
import inter from '../assets/songs/inter.mp3';
import para from '../assets/songs/para.mp3';
import avengers from '../assets/songs/avengers.mp3';


export const moviesData = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: ["Drama"],
    rating: 9.3,
    director: "Frank Darabont",
    duration: "2h 22m",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster: "https://www.tallengestore.com/cdn/shop/products/Movie_Poster_Art_-_The_Shawshank_Redemption_-_Tallenge_Hollywood_Poster_Collection_281a20ac-f062-4b7d-8ccc-436d690078af.jpg?v=1578138044",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    music: sha
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    genre: ["Crime", "Drama"],
    rating: 9.2,
    director: "Francis Ford Coppola",
    duration: "2h 55m",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster: "https://images5.alphacoders.com/131/1315822.jpg",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    music: godfather
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    rating: 9.0,
    director: "Christopher Nolan",
    duration: "2h 32m",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    music: dark
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    genre: ["Crime", "Drama"],
    rating: 8.9,
    director: "Quentin Tarantino",
    duration: "2h 34m",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    poster: "https://i.pinimg.com/736x/18/9d/82/189d825fac525d43548d191d69fd9708.jpg",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    music: pulp
  },
  {
    id: 5,
    title: "Forrest Gump",
    year: 1994,
    genre: ["Drama", "Romance"],
    rating: 8.8,
    director: "Robert Zemeckis",
    duration: "2h 22m",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man.",
    poster: "https://lh5.googleusercontent.com/proxy/4int_K6SjtXTvuhsLnfyTArrZh8taTrGupNOtImQGkdWZ_G-Tb5tOiE6dxptD9U4zPjUqkSm0t5ZXE_XBv37UuUjiEj9g9r-NxmasGY",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    music: forest
  },
  {
    id: 6,
    title: "Inception",
    year: 2010,
    genre: ["Action", "Adventure", "Sci-Fi"],
    rating: 8.8,
    director: "Christopher Nolan",
    duration: "2h 28m",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    music: inc
  },
  {
    id: 7,
    title: "The Matrix",
    year: 1999,
    genre: ["Action", "Sci-Fi"],
    rating: 8.7,
    director: "Lana Wachowski, Lilly Wachowski",
    duration: "2h 16m",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    poster: "https://c8.alamy.com/comp/2K4TMJ5/the-matrix-1999-the-matrix-movie-poster-keanu-reeves-2K4TMJ5.jpg",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    music: matrix
  },
  {
    id: 8,
    title: "Goodfellas",
    year: 1990,
    genre: ["Biography", "Crime", "Drama"],
    rating: 8.7,
    director: "Martin Scorsese",
    duration: "2h 26m",
    description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.",
    poster: "https://wallpapers.com/images/hd/goodfellas-movie-poster-template-7cc9ns0pt4wnw6um.jpg",
    cast: ["Robert De Niro", "Ray Liotta", "Joe Pesci"],
    music: good
  },
  {
    id: 9,
    title: "The Silence of the Lambs",
    year: 1991,
    genre: ["Crime", "Drama", "Thriller"],
    rating: 8.6,
    director: "Jonathan Demme",
    duration: "1h 58m",
    description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
    poster: "https://w0.peakpx.com/wallpaper/659/773/HD-wallpaper-movie-the-silence-of-the-lambs.jpg",
    cast: ["Jodie Foster", "Anthony Hopkins", "Scott Glenn"],
    music: silent
  },
  {
    id: 10,
    title: "Interstellar",
    year: 2014,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    rating: 8.6,
    director: "Christopher Nolan",
    duration: "2h 49m",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: "https://c4.wallpaperflare.com/wallpaper/411/347/616/movies-hollywood-movies-wallpaper-preview.jpg",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    music: inter
  },
  {
    id: 11,
    title: "Parasite",
    year: 2019,
    genre: ["Comedy", "Drama", "Thriller"],
    rating: 8.6,
    director: "Bong Joon Ho",
    duration: "2h 12m",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    poster: "https://images-cdn.ubuy.co.in/6364358337da3701121dc9f4-parasite-2019-movie-poster-24x36-inches.jpg",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    music:para
  },
  {
    id: 12,
    title: "The Avengers",
    year: 2012,
    genre: ["Action", "Adventure", "Sci-Fi"],
    rating: 8.0,
    director: "Joss Whedon",
    duration: "2h 23m",
    description: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army.",
    poster: "https://wallpapers.com/images/featured/avengers-vm16xv4a69smdauy.jpg",
    cast: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
    music: avengers
  }
];