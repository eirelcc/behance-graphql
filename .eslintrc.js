'use strict';

const OFF = 0;
const ERROR = 2;

module.exports = {
    extends: 'airbnb-base',
    env: {
        node: true
    },
    rules: {
        indent: OFF,
        'no-console': OFF,
        'function-paren-newline': OFF,
        'comma-dangle': OFF,
        'max-len': OFF
    }
};
