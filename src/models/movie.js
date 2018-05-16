/*
TODO: Refactor getMovies and getMovieById to use DataLoader
Check out models/cast for an example!
*/

const PAGE_SIZE = 20;

module.exports = ({ config, utils, store, loaders }) => ({
  async getMovieById(id) {
    const url = `/movie/${id}`;

    return loaders.fetch.load(url);
  },

  async getMovies({ sort, page }) {
    let sortParam = null;
    if (sort === 'POPULARITY') sortParam = 'popularity.desc';
    else if (sort === 'RELEASE_DATE') sortParam = 'release_date.desc';

    const paramString = utils.paramsObjectToURLString({
      ...(page ? { page } : {}),
      ...(sortParam ? { sort_by: sortParam } : {}),
    });
    const url = `/discover/movie`;

    return loaders
      .fetch
      .load(url)
      .then(json => json.results || []);
  },

  async getMovieLikes({ user }) {
    return await store.likes.findAll({ where: { user } });
  },

  async toggleMovieLike({ id, user }) {
    const like = await store.likes.find({
      where: {
        user,
        movie: id,
      },
    });

    if (!like) await store.likes.create({ user, movie: id });
    else await store.likes.destroy({ where: { user, movie: id } });
  },

  async isMovieLiked({ id, user }) {
    const like = await store.likes.find({ where: { user, movie: id } });
    return !!like;
  },
});
