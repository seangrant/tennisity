const rewireEmotion = require('react-app-rewire-emotion'); // eslint-disable-line

module.exports = function override(config, env) {
  return rewireEmotion(config, env, { inline: true });
};
