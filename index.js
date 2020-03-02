const { fetchWcif } = require('./lib');

if (!process.argv[2]) {
  console.error('Missing CompId');
  process.exit(1);
}

fetchWcif(process.argv[2])
.then(wcif => {
  console.log(wcif);
});