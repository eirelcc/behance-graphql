const images = parent => {
    return parent.images ? Object.values(parent.images) : [];
};

module.exports.images = images;
