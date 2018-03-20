const { fetchByURL } = require('../utils');

const comments = project => fetchByURL(`/projects/${project.id}/comments`);

module.exports = {
    comments
};
