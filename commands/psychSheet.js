const asTable = require('as-table');
const utils = require('../lib/utils');
const { format } = require('../lib/format');

exports.command = 'psych <event>';
exports.description = 'Get the psych sheet for the given event';
exports.builder = {
  sort: {
    description: 'Sort by: single | average',
    default: 'single',
  },
};

exports.handler = (argv) => {
  argv.json.then((comp) => {
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
  });
};
