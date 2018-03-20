const { fetchByURL } = require('../utils');

const projects = collection =>
    fetchByURL(`/collections/${collection.id}/projects`);

module.exports = {
    projects
};
