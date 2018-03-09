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
const projects = (parent, args, ctx, info) => fetchByURL(`/projects`, args);

const project = (parent, args, ctx, info) => fetchByURL(`/projects/${args.id}`);

const projectComments = (parent, args, ctx, info) =>
    fetchByURL(`/projects/${args.id}/comments`);

// Creatives To Follow
const creativesToFollow = (parent, args, ctx, info) =>
    fetchByURL(`/creativestofollow`);

// Creative Fields
const fields = (parent, args, ctx, info) => fetchByURL(`/fields`);

// Collections
const collections = (parent, args, ctx, info) =>
    fetchByURL(`/collections`, args);

const collection = (parent, args, ctx, info) =>
    fetchByURL(`/collections/${args.id}`);

const collectionProjects = (parent, args, ctx, info) =>
    fetchByURL(`/collections/${args.id}/projects`);

module.exports = {
    project,
    projects,
    projectComments,
    creativesToFollow,
    fields,
    collections,
    collection,
    collectionProjects
};
