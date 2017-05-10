const getJson = function getJson(url) {
  return fetch(url).then(response => response.json());
};

const postJson = function postJson(url, data) {
  return fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  }).then(response => response.json());
};

export { getJson, postJson };
