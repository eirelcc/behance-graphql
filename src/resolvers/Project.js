const { fetchByURL } = require('../utils');

const comments = project => fetchByURL(`/projects/${project.id}/comments`);
const covers = parent => Object.values(parent.covers);
const owners = parent => Object.values(parent.owners);

module.exports = {
    comments,
    covers,
    owners
};
