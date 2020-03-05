exports.command = 'groups <command>';
exports.desc = 'Manage set of tracked repos';

exports.builder = (yargs) => yargs.commandDir('./groups');
