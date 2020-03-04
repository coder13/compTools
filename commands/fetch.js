const fs = require('fs');
const api = require('../lib/api');

exports.command = 'fetch';
exports.desc = 'Fetches WCIF';

exports.builder = {
  output: {
    alias: 'o',
    description: 'Output file',
    normalize: true,
  },
};

exports.handler = (argv) => {
  const fetch = argv.auth ? api.fetchWcif(argv.comp, argv.auth) : api.fetchPublicWcif(argv.comp);

  fetch
    .then((res) => {
      const dest = argv.output ? fs.createWriteStream(argv.output)
        : process.stdout;

      res.body.pipe(dest);
    })
    .catch((err) => {
      console.error(err);
    });
};
