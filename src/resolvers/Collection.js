const { fetchByURL } = require('../utils');
const { images } = require('./shared');

const projects = collection =>
    fetchByURL(`/collections/${collection.id}/projects`);

module.exports = {
    projects,
    images
};
