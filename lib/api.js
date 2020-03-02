const fetch = require('node-fetch');

const wcaApiUrl = (resource) => 'https://worldcubeassociation.org/api/v0/' + resource;

const authorizedGet = (url, authorization) => fetch(url, {
  headers: {
    Authorization: 'Bearer ' + authorization
  }
});

const authorizedPost = (url, authorization, body) => fetch(url, {
  method: 'post',
  body: JSON.stringify(body),
  headers: {
    Authorization: 'Bearer ' + authorization
  }
});

module.exports.fetchPublicWcif = function (compId) {
  return fetch(wcaApiUrl(`competitions/${compId}/wcif/public`))
    .then(res => res.json())
    .catch(err => {
      throw err;
    })
}

module.exports.fetchWcif = function (compId, token) {
  return authorizedGet(wcaApiUrl(`competitions/${compId}/wcif`), token)
    .then(res => res.json())
    .catch(err => {
      throw err;
    })
}

module.exports.postWcif = function (compId, token) {
  return authorizedGet(wcaApiUrl(`competitions/${compId}/wcif`), token)
    .then(res => res.json())
    .catch(err => {
      throw err;
    })
}
