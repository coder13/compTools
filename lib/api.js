const fetch = require('node-fetch');

const wcaApiUrl = (resource) => `https://worldcubeassociation.org/api/v0/${resource}`;

const authorizedGet = (url, authorization) => fetch(url, {
  headers: {
    Authorization: `Bearer ${authorization}`,
  },
});

// eslint-disable-next-line no-unused-vars
const authorizedPost = (url, authorization, body) => fetch(url, {
  method: 'post',
  body: JSON.stringify(body),
  headers: {
    Authorization: `Bearer ${authorization}`,
  },
});

module.exports.fetchPublicWcif = (compId) => fetch(wcaApiUrl(`competitions/${compId}/wcif/public`))
  .then((res) => res.json())
  .catch((err) => {
    throw err;
  });


module.exports.fetchWcif = (compId, token) => authorizedGet(wcaApiUrl(`competitions/${compId}/wcif`), token)
  .then((res) => res.json())
  .catch((err) => {
    throw err;
  });

module.exports.postWcif = (compId, token, body) => authorizedPost(wcaApiUrl(`competitions/${compId}/wcif`), token, body)
  .then((res) => res.json())
  .catch((err) => {
    throw err;
  });
