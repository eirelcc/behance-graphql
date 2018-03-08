const qs = require('qs');

const BASE_URL = 'https://api.behance.net/v2';

async function fetchByURL(relativeURL, params) {
    const queryParams = qs.stringify({
        ...params,
        client_id: process.env.CLIENT_ID
    });
    const res = await fetch(`${BASE_URL}${relativeURL}?${queryParams}`);
    const json = await res.json();
    const [data] = json ? Object.values(json) : [];

    return data;
}

const projects = (parent, args, ctx, info) => fetchByURL(`/projects`, args);

const project = (parent, args, ctx, info) => fetchByURL(`/projects/${args.id}`);

module.exports = {
    projects,
    project
};
