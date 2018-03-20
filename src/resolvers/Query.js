const { fetchByURL } = require('../utils');

const projects = (root, args) => fetchByURL(`/projects`, args.params);
const project = (root, args) => fetchByURL(`/projects/${args.id}`);
const creativesToFollow = () => fetchByURL(`/creativestofollow`);
const creativeFields = () => fetchByURL(`/fields`);
const collections = (root, args) => fetchByURL(`/collections`, args.params);
const collection = (root, args) => fetchByURL(`/collections/${args.id}`);
const users = (root, args) => fetchByURL(`/users`, args.params);
const user = (root, args) => fetchByURL(`/users/${args.id}`);

module.exports = {
    projects,
    project,
    creativesToFollow,
    creativeFields,
    collections,
    collection,
    users,
    user
};
