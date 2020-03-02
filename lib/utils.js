const approved = (person) => person.registration.status === 'accepted';

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
