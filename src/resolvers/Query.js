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

const Project = {
    comments: project => {
        return fetchByURL(`/projects/${project.id}/comments`);
    }
};

// Creatives To Follow
const creativesToFollow = (root, args) => {
    return fetchByURL(`/creativestofollow`);
};

// Creative Fields
const creativeFields = (root, args) => {
    return fetchByURL(`/fields`);
};

// Collections
const collections = (root, args) => {
    return fetchByURL(`/collections`, args.params);
};

const collection = (root, args) => {
    return fetchByURL(`/collections/${args.id}`);
};

const Collection = {
    projects: collection => {
        return fetchByURL(`/collections/${collection.id}/projects`);
    }
};

// Users
const users = (root, args) => {
    return fetchByURL(`/users`, args.params);
};

const user = (root, args) => {
    return fetchByURL(`/users/${args.id}`);
};

const User = {
    projects: (user, args) => {
        return fetchByURL(`/users/${user.id}/projects`, args.params);
    },
    wips: (user, args) => {
        return fetchByURL(`/users/${user.id}/wips`, args.params);
    },
    appreciations: (user, args) => {
        return fetchByURL(`/users/${user.id}/appreciations`, args.params);
    },
    collections: (user, args) => {
        return fetchByURL(`/users/${user.id}/collections`, args.params);
    },
    stats: user => {
        return fetchByURL(`/users/${user.id}/stats`);
    },
    followers: (user, args) => {
        return fetchByURL(`/users/${user.id}/followers`, args.params);
    },
    following: (user, args) => {
        return fetchByURL(`/users/${user.id}/following`, args.params);
    },
    workExperience: async user => {
        const data = await fetchByURL(`/users/${user.id}/work_experience`);
        return Array.isArray(data) ? data : [];
    }
};

const Query = {
    projects,
    project,
    creativesToFollow,
    creativeFields,
    collections,
    collection,
    users,
    user
};

module.exports.Collection = Collection;
module.exports.User = User;
module.exports.Query = Query;
