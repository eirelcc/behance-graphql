const jwt = require('jsonwebtoken');
const qs = require('qs');

const APP_SECRET = 'GraphQL-is-aw3some';
const BASE_URL = 'https://api.behance.net/v2';

function getUserId(context) {
    const Authorization = context.request.get('Authorization');
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const { userId } = jwt.verify(token, APP_SECRET);
        return userId;
    }

    throw new Error('Not authenticated');
}

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

module.exports = {
    APP_SECRET,
    getUserId,
    fetchByURL
};
