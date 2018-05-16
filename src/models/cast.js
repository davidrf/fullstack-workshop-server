module.exports = ({ config, utils, loaders }) => ({
  async getCastByMovie(id) {
    const url = `/movie/${id}/credits`;

    return loaders
      .fetch
      .load(url)
      .then(json => json.cast || []);
  }
});
