const asTable = require('as-table');
const api = require('../lib/api');
const utils = require('../lib/utils');
const { format } = require('../lib/format');

module.exports = (argv) => {
  const fetch = argv.auth ? api.fetchWcif(argv.comp, argv.auth) : api.fetchPublicWcif(argv.comp);

  fetch
    .then((comp) => {
      console.log(`Psych Sheet for comp: ${comp.name} event: ${argv.event}`);
      const data = utils.getPsychSheet(comp, argv.event, argv.sort);
      const output = asTable.configure({
        right: () => false,
        print: (value, key) => {
          if (key === 'best') {
            return format(comp.event, value, argv.sort === 'average');
          }
          return String(value);
        },
      })(data);
      console.log(output);
    })
    .catch((err) => {
      console.error(err);
    });
};
