"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../structures/Result");
exports.default = (fn) => {
    try {
        return (0, Result_1.Ok)(fn());
    }
    catch (e) {
        return (0, Result_1.Err)(e);
    }
};
