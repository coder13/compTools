const approved = (person) => person.registration.status === 'accepted';

module.exports.parseActivityCode = (activityCode) => {
  const [, e, r, g, a] = activityCode.match(/(\w+)(?:-r(\d+))?(?:-g(\d+))?(?:-a(\d+))?/);
  return {
    eventId: e,
    roundNumber: r && parseInt(r, 10),
    groupNumber: g && parseInt(g, 10),
    attemptNumber: a && parseInt(a, 10),
  };
};

module.exports.getPsychSheet = (wcif, event, sort) => wcif
  .persons.filter(approved).map((person) => {
    // eslint-disable-next-line eqeqeq
    const pb = person.personalBests.find((p) => p.eventId == event && p.type === sort);
    if (!pb) return null;

    return {
      name: person.name,
      wcaId: person.wcaId,
      country: person.countryIso2,
      best: pb.best,
      worldRanking: pb.worldRanking,
      continentalRanking: pb.continentalRanking,
      nationalRanking: pb.nationalRanking,
    };
  }).filter((i) => !!i).sort((a, b) => a.worldRanking - b.worldRanking);
