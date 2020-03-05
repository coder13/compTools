exports.command = 'print <data>';
exports.desc = 'Manage set of tracked repos';

exports.builder = (yargs) => yargs.commandDir('./print');
