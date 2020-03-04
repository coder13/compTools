const fetch = require('node-fetch');

const wcaApiUrl = (resource) => `https://staging.worldcubeassociation.org/api/v0/${resource}`;

class HTTPError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const authorizedGet = (url, authorization) => fetch(url, {
  headers: {
    authorization: `Bearer ${authorization}`,
    'Content-Type': 'application/json',
  },
}).then((res) => {
  if (res.ok && res.status === 200) {
    return res;
  }

  if (res.status > 500) {
    console.error('Server error when fetching competition');
  }

  if (res.status > 400) {
    console.error('Authentication error when fetching competition');
  }

  throw new HTTPError(res.status, res.statusText);
});

const authorizedPatch = (url, authorization, body) => fetch(url, {
  method: 'PATCH',
  body: JSON.stringify(body),
  headers: {
    Authorization: `Bearer ${authorization}`,
    'Content-Type': 'application/json',
  },
}).then((res) => {
  if (res.ok) {
    return res;
  }

  if (res.status > 500) {
    console.error('Server error when posting competition');
  }

  if (res.status > 400) {
    console.error('Authentication error when posting competition');
  }

  throw new HTTPError(res.status, res.statusText);
});

module.exports.fetchPublicWcif = (compId) => fetch(wcaApiUrl(`competitions/${compId}/wcif/public`));

module.exports.fetchWcif = (compId, token) => authorizedGet(wcaApiUrl(`competitions/${compId}/wcif`), token);

module.exports.updateWcif = (compId, token, body) => authorizedPatch(wcaApiUrl(`competitions/${compId}/wcif`), token, body);
