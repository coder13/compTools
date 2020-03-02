module.exports.getPsychSheet = function (wcif, event, sort) {
  return wcif.persons.filter(approved).map(person => {
    let pb = person.personalBests.find(pb => pb.eventId == event && pb.type == sort);
    if (!pb) return null;

    return {
      name: person.name,
      wcaId: person.wcaId,
      country: person.countryIso2,
      best: pb.best,
      worldRanking: pb.worldRanking,
      continentalRanking: pb.continentalRanking,
      nationalRanking: pb.nationalRanking
    };
  }).filter(i => !!i).sort((a,b) => a.worldRanking - b.worldRanking);
}

const approved = (person) => person.registration.status === 'accepted';