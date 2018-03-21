const { fetchByURL } = require('../utils');
const { images } = require('./shared');

const comments = project => fetchByURL(`/projects/${project.id}/comments`);

module.exports = {
    comments,
    images
};
