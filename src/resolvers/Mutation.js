const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

async function signup(parent, args, ctx, info) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createSU({
        data: { ...args, password }
    });

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user
    };
}

async function login(parent, args, ctx, info) {
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
        token: jwt.sign({ userId: user.id }, APP_SECRET),
        user
    };
}

module.exports = {
    signup,
    login
};
