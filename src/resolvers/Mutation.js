const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../utils');

async function signup(parent, args, ctx) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createSU({
        data: { ...args, password }
    });

    const token = jwt.sign({ username: user.username }, APP_SECRET);

    return {
        token,
        user
    };
}

async function login(parent, args, ctx) {
    const user = await ctx.db.query.sU({
        where: { username: args.username }
    });
    if (!user) {
        throw new Error('No such user found');
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
        throw new Error('Invalid password');
    }

    return {
        token: jwt.sign({ username: user.username }, APP_SECRET),
        user
    };
}

module.exports = {
    signup,
    login
};
