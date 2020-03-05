const chalk = require('chalk');
const utils = require('../../lib/utils');

exports.command = 'print <activityCode>';
exports.desc = 'Prints groups';

exports.builder = {
  activityCode: {
    type: 'string',
  },
};

const flattenRooms = (wcif) => utils.flatMap(wcif.schedule.venues, (venue) => venue.rooms);

const flattenAllChildActivities = ({ childActivities }) => (childActivities.length > 0 ? [
  ...childActivities, ...utils.flatMap(childActivities, flattenAllChildActivities)]
  : childActivities);

const flattenAllActivities = (wcif) => {
  const activities = utils.flatMap(flattenRooms(wcif), (room) => room.activities);
  return [...activities, ...utils.flatMap(activities, flattenAllChildActivities)];
};

const handle = (argv, wcif) => {
  const parsed = utils.parseActivityCode(argv.activityCode);

  if (!parsed.eventId) {
    throw new Error('Missing eventId');
  } else if (!parsed.roundNumber) {
    throw new Error('Missing roundNumber');
  }

  const activities = flattenAllActivities(wcif);

  const groups = activities.filter((a) => {
    const aParsed = utils.parseActivityCode(a.activityCode);
    return aParsed.eventId === parsed.eventId && aParsed.roundNumber === parsed.roundNumber
      && (parsed.groupNumber ? aParsed.groupNumber === parsed.groupNumber : aParsed.groupNumber);
  }).map((activity) => ({
    ...activity,
    persons: wcif.persons
      .filter((person) => person.assignments.some((ass) => ass.activityId === activity.id)),
  }));

  groups.forEach((group) => {
    console.log(chalk.yellow(group.name));

    group.persons.forEach((person) => {
      console.log(` - ${chalk.green(person.name)}`);
    });
    console.log();
  });
};

exports.handler = (argv) => {
  argv.json.then((wcif) => {
    handle(argv, wcif);
  });
};
