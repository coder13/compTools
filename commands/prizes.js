const getPrizeMoney = (event, place) => (event === '333' ? [20, 15, 10] : [10, 7, 5])[place];

exports.command = 'prizes';
exports.describe = 'Get prize money for competitions based on thecubicle\'s scheme';

exports.handler = (argv) => {
  argv.json.then((comp) => {
    const getPerson = (id) => comp.persons.find((p) => +p.registrantId === +id);
    const podiums = {};

    comp.events.forEach((event) => {
      event.rounds.forEach((round) => {
        round.results.slice(0, 3).forEach((podium, place) => {
          if (!podiums[podium.personId]) {
            podiums[podium.personId] = 0;
          }

          podiums[podium.personId] += getPrizeMoney(event.id, place);
        });
      });
    });

    Object.keys(podiums).forEach((personId) => {
      console.log(`${getPerson(personId).name}:\t$${podiums[personId]}`);
    });
  });
};
