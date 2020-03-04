const api = require('../lib/api');

exports.command = 'save';
exports.description = 'Saves a wcif.json';
exports.builder = {
  auth: {
    required: true,
  },
};

exports.handler = (argv) => {
  argv.json
    .then((comp) => api.updateWcif(argv.comp, argv.auth, comp))
    .then((res) => {
      if (res.ok) {
        console.log('Successfully saved competiiton');
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
