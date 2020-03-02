const chalk = require('chalk');
const asTable = require('as-table');
const api = require('../lib/api');
const utils = require('../lib/utils');
const {format} = require('../lib/format');

module.exports = function (argv) {
  let fetch = argv.auth ? api.fetchWcif(argv.comp, argv.auth) : api.fetchPublicWcif(argv.comp);

  fetch.then(comp => {
      console.log(`Psych Sheet for comp: ${comp.name} event: ${argv.event}`);
      let data = utils.getPsychSheet(comp, argv.event, argv.sort);
      let output = asTable.configure({
        right: (k) => false,//['worldRanking', 'continentalRanking', 'nationalRanking'].indexOf(k) > -1,
        print: (value, key) => {
          if (key === 'best') {
            return format(comp.event, value, argv.sort === 'average');
          } else {
            return String(value);
          }
        }
      })(data);
      console.log(output);
    })
    .catch(err => {
      console.error(err);
    });
};
