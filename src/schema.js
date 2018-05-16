/*
TODO: Write your schema using Schema Definition Language

Part 1: Write a Movie type that corresponds to the <Movie /> React component.
Check the slide deck for hints!

const Movies = ({ movies }) => {
  return movies.map(movie => (
    <Movie
      key={movie.id}
      id={movie.id}
      title={movie.title}
      overview={movie.overview}
      score={movie.score}
      voteCount={movie.voteCount}
      popularity={movie.popularity}
      poster={movie.poster}
      genres={movie.genres}
      releaseDate={movie.releaseData}
      cast={movie.cast}
      isLiked={movie.isLiked}
      runtime={movie.runtime}
    />
  ));
}

Part 2: Fill in some queries and mutations.
- Write a movie query to fetch a single movie by id
- Write a toggleLike mutation to toggle if a movie is liked
- Write a likes query that fetches all the liked movies
*/

module.exports = `
  type Query {
    movies(sort: SORT_TYPE, page: Int): [Movie]!
  }

  type Mutation {
    login(email: String!): String
  }

  enum SORT_TYPE {
    POPULARITY
    RELEASE_DATE
  }

  type Movie {
    id: ID!
    title: String
    overview: String
    score: Int
    voteCount: Int
    popularity: Float
    poster(size: Int): String
    genres: [String!]!
    releaseDate: String
    cast: [Cast!]!
    isLiked: Boolean
    runTime: Int
  }

  type Cast {
    id: ID!
    name: String!
    photo(size: Int): String!
    gender: String!
    character: String!
  }
`;
