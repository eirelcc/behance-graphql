const qs = require('qs');

const BASE_URL = 'https://api.behance.net/v2';

async function fetchResponseByURL(relativeURL, params) {
    const queryParams = qs.stringify({
        ...params,
        client_id: process.env.CLIENT_ID
    });
    const res = await fetch(`${BASE_URL}${relativeURL}?${queryParams}`);
    return res.json();
}

const projects = async (parent, args, ctx, info) => {
    const json = await fetchResponseByURL(`/projects`, args);
    return json.projects;
};

module.exports = {
    projects
};
