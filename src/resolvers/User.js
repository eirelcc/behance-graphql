const { fetchByURL } = require('../utils');
const { images } = require('./shared');

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

const workExperience = async (user) => {
    const data = await fetchByURL(`/users/${user.id}/work_experience`);
    return Array.isArray(data) ? data : [];
};

const sections = user => Object.entries(user.sections).map(([title, text]) => ({
        title,
        text
    }));

module.exports = {
    projects,
    images,
    sections,
    wips,
    appreciations,
    collections,
    stats,
    followers,
    following,
    workExperience
};
