const { fetchByURL } = require('../utils');

const projects = (user, args) =>
    fetchByURL(`/users/${user.id}/projects`, args.params);

const wips = (user, args) => fetchByURL(`/users/${user.id}/wips`, args.params);

const appreciations = (user, args) =>
    fetchByURL(`/users/${user.id}/appreciations`, args.params);

const collections = (user, args) =>
    fetchByURL(`/users/${user.id}/collections`, args.params);

const stats = user => fetchByURL(`/users/${user.id}/stats`);

const followers = (user, args) =>
    fetchByURL(`/users/${user.id}/followers`, args.params);

const following = (user, args) =>
    fetchByURL(`/users/${user.id}/following`, args.params);

const workExperience = async user => {
    const data = await fetchByURL(`/users/${user.id}/work_experience`);
    return Array.isArray(data) ? data : [];
};

module.exports = {
    projects,
    wips,
    appreciations,
    collections,
    stats,
    followers,
    following,
    workExperience
};
