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

// Projects
const projects = (root, args) => {
    return fetchByURL(`/projects`, args.params);
};
const project = (root, args) => {
    return fetchByURL(`/projects/${args.id}`);
};
const projectComments = (root, args) => {
    return fetchByURL(`/projects/${args.id}/comments`);
};

// Creatives To Follow
const creativesToFollow = (root, args) => {
    return fetchByURL(`/creativestofollow`);
};

// Creative Fields
const fields = (root, args) => {
    return fetchByURL(`/fields`);
};

// Collections
const collections = (root, args) => {
    return fetchByURL(`/collections`, args.params);
};
const collection = (root, args) => {
    return fetchByURL(`/collections/${args.id}`);
};
const collectionProjects = (root, args) => {
    fetchByURL(`/collections/${args.id}/projects`);
};

// Users
const users = (root, args) => {
    return fetchByURL(`/users`, args.params);
};
const user = (root, args) => {
    return fetchByURL(`/users/${args.id}`);
};
const userProjects = (root, args) => {
    return fetchByURL(`/users/${args.id}/projects`, args.params);
};
const userWips = (root, args) => {
    return fetchByURL(`/users/${args.id}/wips`, args.params);
};
const userAppreciations = (root, args) => {
    return fetchByURL(`/users/${args.id}/appreciations`, args.params);
};

module.exports = {
    project,
    projects,
    projectComments,
    creativesToFollow,
    fields,
    collections,
    collection,
    collectionProjects,
    users,
    user,
    userProjects,
    userWips,
    userAppreciations
};
