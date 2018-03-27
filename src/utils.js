const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

const APP_SECRET = 'GraphQL-is-aw3some';
const BASE_URL = 'https://api.behance.net/v2';

function getUserId(context) {
    const Authorization = context.request.get('Authorization');
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const { username } = jwt.verify(token, APP_SECRET);
        return username;
    }

    throw new Error('Not authenticated');
}

function toURLString(params) {
    return Object.entries(params)
        .map(entry => entry.map(encodeURIComponent).join('='))
        .join('&');
}

async function fetchByURL(url, params) {
    const queryParams = toURLString({
        ...params,
        client_id: process.env.CLIENT_ID
    });
    const res = await fetch(`${BASE_URL}${url}?${queryParams}`);
    const json = await res.json();
    const [data] = json ? Object.values(json) : [];

    return data;
}

module.exports = {
    APP_SECRET,
    getUserId,
    fetchByURL
};
