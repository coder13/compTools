const chalk = require('chalk');
const utils = require('../../lib/utils');

exports.command = 'overview';
exports.desc = 'Provides and overview of groups';

exports.builder = {
  activityCode: {
    type: 'string',
  },
};

const flattenRooms = (wcif) => utils.flatMap(wcif.schedule.venues, (venue) => venue.rooms);

const handle = (argv, wcif) => {
  const rounds = utils.flatMap(flattenRooms(wcif), (room) => room.activities)
    .filter((round) => utils.parseActivityCode(round.activityCode).eventId !== 'other');

  rounds.slice(0).forEach((round) => {
    const roundConfig = round.extensions.find((ext) => ext.id === 'groupifier.ActivityConfig');
    if (!roundConfig) {
      return;
    }

    const {
      groups, capacity, scramblers, runners, assignJudges,
    } = roundConfig.data;

    console.log(chalk.yellow(round.name));
    console.log(chalk.white(`groups: ${groups} | capacity: ${Math.round(capacity * 100) / 100} | scramblers: ${scramblers} | runners: ${runners} | assignJudges: ${assignJudges}`));
  });
};

exports.handler = (argv) => {
  argv.json.then((wcif) => {
    handle(argv, wcif);
  });
};
