const fetch = require('node-fetch');

module.exports = ({ config, utils, loaders }) => ({
  async getCastByMovie(id) {
    const paramString = utils.paramsObjectToURLString(config.params);
    const url = `${config.url}/movie/${id}/credits${paramString}`;

    return fetch(url)
      .then(res => res.json())
      .then(json => json.cast || []);
  }
});
