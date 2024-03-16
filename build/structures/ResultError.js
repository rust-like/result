"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require('../../config.json');
const showHelpLink = process.env.RESULTJS_NO_HELP_LINK ||
    process.argv.some(arg => arg == '--resultjs-no-help-link');
class ResultError extends Error {
    static unwrap() {
        return new this("Cannot unwrap an error variant.", '01');
    }
    static unwrap_err() {
        return new this("Could not unwrap err, result was ok.", '02');
    }
    constructor(message, code) {
        super(message + (showHelpLink ? '' : ' Read more here: ' + config.host + config.errorPath.replace(/{code}/g, code)));
    }
}
exports.default = ResultError;
