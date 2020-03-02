const getPrizeMoney = (event, place) => {
  return (event === '333' ? [20, 15, 10] : [10, 7, 5])[place]
}

const fs = require('fs');
const wcifFile = process.argv[2];
if (!wcifFile) {
  console.error('No WCIF specified');
  return;
}

const wcif = require(wcifFile);
console.log(`Prizes for: ${wcif.id}`);

const getPerson = (id) => wcif.persons.find(p => p.registrantId == id);

const podiums = {};

wcif.events.forEach(event => {
  event.rounds.forEach(round => {
    round.results.slice(0,3).forEach((podium, place) => {
      if (!podiums[podium.personId]) {
        podiums[podium.personId] = 0;
      }

      podiums[podium.personId] += getPrizeMoney(event.id, place);
    });
  });
});

Object.keys(podiums).forEach(personId => {
  // console.log(personId, wcif.persons.find(p => p.registrantId == personId));
  console.log(`${getPerson(personId).name}:\t$${podiums[personId]}`);
});